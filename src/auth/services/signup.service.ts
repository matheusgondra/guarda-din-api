import { Injectable } from "@nestjs/common";
import { HashGenerator } from "@/cryptography/protocols/hash-generator.protocol";
import { UserAlreadyExistsError } from "@/domain/errors/user-already-exists.error";
import { SignupParam, SignupResult, SignupUseCase } from "@/domain/usecases/signup.usecase";
import { User } from "@/user/entities/user.entity";
import { AddUserRepository } from "@/user/protocols/add-user-repository.protocol";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol";

@Injectable()
export class SignupService implements SignupUseCase {
	constructor(
		private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
		private readonly hashGenerator: HashGenerator,
		private readonly addUserRepository: AddUserRepository
	) {}

	async execute(param: SignupParam): Promise<SignupResult> {
		const userAlreadyExists = await this.loadUserByEmailRepository.loadByEmail(param.email);
		if (userAlreadyExists) {
			throw new UserAlreadyExistsError();
		}

		const hashedPassword = await this.hashGenerator.generate(param.password);

		const user = new User({
			...param,
			password: hashedPassword
		});
		await this.addUserRepository.add(user);

		return null;
	}
}
