import { Test } from "@nestjs/testing";
import { LoginService } from "@/auth/services/login.service";
import { LoginParam } from "@/domain/usecases/login.usecase";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol";

describe("LoginService", () => {
	const param: LoginParam = {
		email: "any@email.com",
		password: "anyPassword"
	};

	let sut: LoginService;
	let loadUserByEmailRepository: LoadUserByEmailRepository;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				LoginService,
				{
					provide: LoadUserByEmailRepository,
					useValue: {
						loadByEmail: jest.fn()
					}
				}
			]
		}).compile();

		sut = module.get<LoginService>(LoginService);
		loadUserByEmailRepository = module.get<LoadUserByEmailRepository>(LoadUserByEmailRepository);
	});

	it("Should call LoadUserByEmailRepository with correct email", async () => {
		const loadByEmailSpy = jest.spyOn(loadUserByEmailRepository, "loadByEmail");

		await sut.execute(param);

		expect(loadByEmailSpy).toHaveBeenCalledWith(param.email);
	});
});
