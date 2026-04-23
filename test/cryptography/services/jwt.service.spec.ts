import { Test } from "@nestjs/testing";
import jwt from "jsonwebtoken";
import { JwtService } from "@/cryptography/services/jwt.service";

jest.mock("jsonwebtoken", () => ({
	sign: jest.fn().mockReturnValue("anyToken")
}));

describe("JwtService", () => {
	let sut: JwtService;

	const secret = "anySecret";
	const payload = "anyPayload";

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				{
					provide: JwtService,
					useFactory: () => new JwtService(secret)
				}
			]
		}).compile();

		sut = module.get<JwtService>(JwtService);
	});

	it("Should call jwt.sign with correct values", async () => {
		const signSpy = jest.spyOn(jwt, "sign");

		await sut.generateToken(payload);

		expect(signSpy).toHaveBeenCalledWith({ sub: payload }, secret, { expiresIn: "1h" });
	});

	it("Should throw if jwt.sign throws", async () => {
		jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
			throw new Error();
		});

		const promise = sut.generateToken(payload);

		await expect(promise).rejects.toThrow();
	});

	it("Should return a token on success", async () => {
		const token = await sut.generateToken(payload);

		expect(token).toBe("anyToken");
	});
});
