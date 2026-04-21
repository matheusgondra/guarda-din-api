import { Test } from "@nestjs/testing";
import { PrismaService } from "@/prisma/services/prisma.service";
import { UserRepository } from "@/user/repositories/user.repository";

describe("UserRepository", () => {
	const email = "any@email.com";

	let sut: UserRepository;

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
	});

	describe("loadByEmail", () => {
		it("should return null if user does not exist", async () => {
			const result = await sut.loadByEmail(email);

			expect(result).toBeNull();
		});
	});
});
