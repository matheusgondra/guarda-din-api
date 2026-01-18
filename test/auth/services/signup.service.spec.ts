import { Test } from "@nestjs/testing";
import { UserMock } from "@test/user/mock/user.mock";
import { SignupService } from "@/auth/services/signup.service";
import { HashGenerator } from "@/cryptography/protocols/hash-generator.protocol";
import { UserAlreadyExistsError } from "@/domain/errors/user-already-exists.error";
import { SignupParam } from "@/domain/usecases/signup.usecase";
import { AddUserRepository } from "@/user/protocols/add-user-repository.protocol";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol";

describe("SignupService", () => {
	let sut: SignupService;
	let loadUserByEmailRepositoryStub: LoadUserByEmailRepository;
	let hashGeneratorStub: HashGenerator;
	let addUserRepositoryStub: AddUserRepository;

	const param: SignupParam = {
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any@email.com",
		password: "any_password"
	};
	const userMock = new UserMock();

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
						generate: jest.fn().mockResolvedValue("hashed_password")
					}
				},
				{
					provide: AddUserRepository,
					useValue: {
						add: jest.fn()
					}
				}
			]
		}).compile();

		sut = module.get<SignupService>(SignupService);
		loadUserByEmailRepositoryStub = module.get<LoadUserByEmailRepository>(LoadUserByEmailRepository);
		hashGeneratorStub = module.get<HashGenerator>(HashGenerator);
		addUserRepositoryStub = module.get<AddUserRepository>(AddUserRepository);
	});

	describe("LoadUserByEmailRepository", () => {
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
	});

	describe("HashGenerator", () => {
		it("Should call HashGenerator with correct value", async () => {
			const generateSpy = jest.spyOn(hashGeneratorStub, "generate");

			await sut.execute(param);

			expect(generateSpy).toHaveBeenCalledWith(param.password);
		});

		it("Should throw if HashGenerator throws", async () => {
			jest.spyOn(hashGeneratorStub, "generate").mockRejectedValueOnce(new Error());

			const promise = sut.execute(param);

			await expect(promise).rejects.toThrow();
		});
	});

	describe("AddUserRepository", () => {
		it("Should call AddUserRepository with correct value", async () => {
			const addSpy = jest.spyOn(addUserRepositoryStub, "add");

			await sut.execute(param);

			expect(addSpy).toHaveBeenCalledWith({
				...param,
				password: "hashed_password",
				id: expect.any(String),
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date)
			});
		});

		it("Should throw if AddUserRepository throws", async () => {
			jest.spyOn(addUserRepositoryStub, "add").mockRejectedValueOnce(new Error());

			const promise = sut.execute(param);

			await expect(promise).rejects.toThrow();
		});
	});
});
