import { Test } from "@nestjs/testing";
import bcrypt from "bcryptjs";
import { BCryptService } from "@/cryptography/services/bcrypt.service";

jest.mock("bcryptjs", () => ({
	__esModule: true,
	default: {
		hash: jest.fn().mockResolvedValue("hashed_value")
	}
}));

describe("BCryptService", () => {
	let sut: BCryptService;

	const value = "any_value";
	const salt = 3;

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
