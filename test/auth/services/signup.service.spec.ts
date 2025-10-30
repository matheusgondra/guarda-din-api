import { Test } from "@nestjs/testing";
import { LoadUserByEmailRepository } from "@user/interfaces/load-user-by-email.repository";
import { SignupService } from "@/auth/services/signup.service";
import { UserAlreadyExistsError } from "@/domain/errors/user-already-exists.error";
import { SignupParam } from "@/domain/usecases/signup.usecase";
import { User } from "@/user/entities/user.entity";

describe("SignupService", () => {
	let sut: SignupService;
	let loadUserByEmailRepositoryStub: LoadUserByEmailRepository;

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
						execute: jest.fn()
					}
				}
			]
		}).compile();

		sut = module.get<SignupService>(SignupService);
		loadUserByEmailRepositoryStub = module.get<LoadUserByEmailRepository>(LoadUserByEmailRepository);
	});

	it("Should call LoadUserByEmailRepository with correct email", async () => {
		const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, "execute");

		await sut.execute(param);

		expect(loadByEmailSpy).toHaveBeenCalledWith(param.email);
	});

	it("Should throw if LoadUserByEmailRepository throws", async () => {
		jest.spyOn(loadUserByEmailRepositoryStub, "execute").mockRejectedValueOnce(new Error());

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow();
	});

	it("Should throw UserAlreadyExistsError if LoadUserByEmailRepository returns a user", async () => {
		jest.spyOn(loadUserByEmailRepositoryStub, "execute").mockResolvedValueOnce(userMock);

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow(new UserAlreadyExistsError());
	});
});
