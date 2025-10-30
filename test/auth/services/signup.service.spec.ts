import { Test } from "@nestjs/testing";
import { LoadUserByEmailRepository } from "@user/interfaces/load-user-by-email.repository";
import { SignupService } from "@/auth/services/signup.service";
import { SignupParam } from "@/domain/usecases/signup.usecase";

describe("SignupService", () => {
	let sut: SignupService;
	let loadUserByEmailRepositoryStub: LoadUserByEmailRepository;

	const param: SignupParam = {
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any@email.com",
		password: "any_password"
	};

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
});
