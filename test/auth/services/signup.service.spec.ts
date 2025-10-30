import { Test } from "@nestjs/testing";
import { SignupService } from "@/auth/services/signup.service";
import { HashGenerator } from "@/cryptography/protocols/hash-generator.protocol";
import { UserAlreadyExistsError } from "@/domain/errors/user-already-exists.error";
import { SignupParam } from "@/domain/usecases/signup.usecase";
import { User } from "@/user/entities/user.entity";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol";

describe("SignupService", () => {
	let sut: SignupService;
	let loadUserByEmailRepositoryStub: LoadUserByEmailRepository;
	let hashGeneratorStub: HashGenerator;

	const param: SignupParam = {
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any@email.com",
		password: "any_password"
	};
	const userMock = new User(
		"any_id",
		"any_first_name",
		"any_last_name",
		"any@email.com",
		"hashed_password",
		new Date("2023-01-01T00:00:00Z"),
		new Date("2023-01-01T00:00:00Z")
	);

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				SignupService,
				{
					provide: LoadUserByEmailRepository,
					useValue: {
						loadByEmail: jest.fn().mockResolvedValue(null)
					}
				},
				{
					provide: HashGenerator,
					useValue: {
						generate: jest.fn()
					}
				}
			]
		}).compile();

		sut = module.get<SignupService>(SignupService);
		loadUserByEmailRepositoryStub = module.get<LoadUserByEmailRepository>(LoadUserByEmailRepository);
		hashGeneratorStub = module.get<HashGenerator>(HashGenerator);
	});

	it("Should call LoadUserByEmailRepository with correct email", async () => {
		const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, "loadByEmail");

		await sut.execute(param);

		expect(loadByEmailSpy).toHaveBeenCalledWith(param.email);
	});

	it("Should throw if LoadUserByEmailRepository throws", async () => {
		jest.spyOn(loadUserByEmailRepositoryStub, "loadByEmail").mockRejectedValueOnce(new Error());

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow();
	});

	it("Should throw UserAlreadyExistsError if LoadUserByEmailRepository returns a user", async () => {
		jest.spyOn(loadUserByEmailRepositoryStub, "loadByEmail").mockResolvedValueOnce(userMock);

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow(new UserAlreadyExistsError());
	});

	it("Should call HashGenerator with correct value", async () => {
		const generateSpy = jest.spyOn(hashGeneratorStub, "generate");

		await sut.execute(param);

		expect(generateSpy).toHaveBeenCalledWith(param.password);
	});
});
