import { Test } from "@nestjs/testing";
import { UserMock } from "@test/user/mock/user.mock";
import { LoginService } from "@/auth/services/login.service";
import { HashComparer } from "@/cryptography/protocols/hash-comparer.protocol";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials.error";
import { LoginParam } from "@/domain/usecases/login.usecase";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol";

describe("LoginService", () => {
	const param: LoginParam = {
		email: "any@email.com",
		password: "anyPassword"
	};
	const userMock = new UserMock();

	let sut: LoginService;
	let loadUserByEmailRepository: LoadUserByEmailRepository;
	let hashComparer: HashComparer;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				LoginService,
				{
					provide: LoadUserByEmailRepository,
					useValue: {
						loadByEmail: jest.fn().mockResolvedValue(userMock)
					}
				},
				{
					provide: HashComparer,
					useValue: {
						compare: jest.fn().mockResolvedValue(true)
					}
				}
			]
		}).compile();

		sut = module.get<LoginService>(LoginService);
		loadUserByEmailRepository = module.get<LoadUserByEmailRepository>(LoadUserByEmailRepository);
		hashComparer = module.get<HashComparer>(HashComparer);
	});

	it("Should call LoadUserByEmailRepository with correct email", async () => {
		const loadByEmailSpy = jest.spyOn(loadUserByEmailRepository, "loadByEmail");

		await sut.execute(param);

		expect(loadByEmailSpy).toHaveBeenCalledWith(param.email);
	});

	it("Should throw if LoadUserByEmailRepository throws", async () => {
		jest.spyOn(loadUserByEmailRepository, "loadByEmail").mockRejectedValueOnce(new Error());

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow();
	});

	it("Should throw InvalidCredentialsError if LoadUserByEmailRepository returns null", async () => {
		jest.spyOn(loadUserByEmailRepository, "loadByEmail").mockResolvedValueOnce(null);

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow(new InvalidCredentialsError());
	});

	it("Should call HashComparer with correct values", async () => {
		const compareSpy = jest.spyOn(hashComparer, "compare");

		await sut.execute(param);

		expect(compareSpy).toHaveBeenCalledWith(param.password, userMock.getPassword());
	});

	it("Should throw if HashComparer throws", async () => {
		jest.spyOn(hashComparer, "compare").mockRejectedValueOnce(new Error());

		const promise = sut.execute(param);

		await expect(promise).rejects.toThrow();
	});
});
