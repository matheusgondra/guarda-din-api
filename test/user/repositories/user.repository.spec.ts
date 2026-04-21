import { Test } from "@nestjs/testing";
import { PrismaService } from "@/prisma/services/prisma.service";
import { UserRepository } from "@/user/repositories/user.repository";
import { UserMock } from "../mock/user.mock";

describe("UserRepository", () => {
	const email = "any@email.com";
	const userMock = new UserMock();

	let sut: UserRepository;
	let prismaService: PrismaService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				UserRepository,
				{
					provide: PrismaService,
					useValue: {
						user: {
							findUnique: jest.fn(),
							create: jest.fn()
						}
					}
				}
			]
		}).compile();

		sut = module.get<UserRepository>(UserRepository);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	describe("loadByEmail", () => {
		it("Should return null if user does not exist", async () => {
			const result = await sut.loadByEmail(email);

			expect(result).toBeNull();
		});

		it("Should throw if PrismaService throws", async () => {
			jest.spyOn(prismaService.user, "findUnique").mockRejectedValueOnce(new Error());

			const promise = sut.loadByEmail(email);

			await expect(promise).rejects.toThrow();
		});

		it("Should return a user if it exists", async () => {
			jest.spyOn(prismaService.user, "findUnique").mockResolvedValueOnce({
				id: userMock.getId(),
				firstName: userMock.getFirstName(),
				lastName: userMock.getLastName(),
				email: userMock.getEmail(),
				password: userMock.getPassword(),
				createdAt: userMock.getCreatedAt(),
				updatedAt: userMock.getUpdatedAt()
			});

			const result = await sut.loadByEmail(email);

			expect(result).toEqual(userMock);
		});
	});

	describe("add", () => {
		it("Should call PrismaService.user.create with correct values", async () => {
			const createSpy = jest.spyOn(prismaService.user, "create");
			await sut.add(userMock);

			expect(createSpy).toHaveBeenCalledWith({
				data: {
					firstName: userMock.getFirstName(),
					lastName: userMock.getLastName(),
					email: userMock.getEmail(),
					password: userMock.getPassword(),
					createdAt: userMock.getCreatedAt(),
					updatedAt: userMock.getUpdatedAt()
				}
			});
		});

		it("Should throw if PrismaService.user.create throws", async () => {
			jest.spyOn(prismaService.user, "create").mockRejectedValueOnce(new Error());

			const promise = sut.add(userMock);

			await expect(promise).rejects.toThrow();
		});
	});
});
