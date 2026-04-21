import { Test } from "@nestjs/testing";
import { PrismaService } from "@/prisma/services/prisma.service";
import { UserRepository } from "@/user/repositories/user.repository";

describe("UserRepository", () => {
	const email = "any@email.com";

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
							findUnique: jest.fn()
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
	});
});
