import { Test } from "@nestjs/testing";
import bcrypt from "bcryptjs";
import { BCryptService } from "@/cryptography/services/bcrypt.service";

jest.mock("bcryptjs", () => ({
	__esModule: true,
	default: {
		hash: jest.fn().mockResolvedValue("hashed_value"),
		compare: jest.fn().mockResolvedValue(true)
	}
}));

describe("BCryptService", () => {
	let sut: BCryptService;

	const value = "any_value";
	const salt = 3;
	const hash = "any_hash";

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				{
					provide: BCryptService,
					useFactory: () => new BCryptService(salt)
				}
			]
		}).compile();

		sut = module.get<BCryptService>(BCryptService);
	});

	describe("generate", () => {
		it("Should call bcrypt.hash with correct values", async () => {
			const hashSpy = jest.spyOn(bcrypt, "hash");

			await sut.generate(value);

			expect(hashSpy).toHaveBeenCalledWith(value, salt);
		});

		it("Should return a hashed value on success", async () => {
			const hashedValue = await sut.generate(value);

			expect(hashedValue).toBe("hashed_value");
		});

		it("Should throw if bcrypt.hash throws", async () => {
			jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
				throw new Error();
			});

			const promise = sut.generate(value);

			await expect(promise).rejects.toThrow();
		});
	});

	describe("compare", () => {
		it("Should call bcrypt.compare with correct values", async () => {
			const compareSpy = jest.spyOn(bcrypt, "compare");

			await sut.compare(value, hash);

			expect(compareSpy).toHaveBeenCalledWith(value, hash);
		});

		it("Should throw if bcrypt.compare throws", async () => {
			jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
				throw new Error();
			});

			const promise = sut.compare(value, hash);

			await expect(promise).rejects.toThrow();
		});

		it("Should return true if bcrypt.compare returns true", async () => {
			const isValid = await sut.compare(value, hash);

			expect(isValid).toBe(true);
		});
	});
});
