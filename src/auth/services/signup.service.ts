import { Injectable } from "@nestjs/common";
import { HashGenerator } from "@/cryptography/protocols/hash-generator.protocol.js";
import { UserAlreadyExistsError } from "@/domain/errors/user-already-exists.error.js";
import { SignupParam, SignupResult, SignupUseCase } from "@/domain/usecases/auth/signup.usecase.js";
import { User } from "@/user/entities/user.entity.js";
import { AddUserRepository } from "@/user/protocols/add-user-repository.protocol.js";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol.js";

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
		const newUser = await this.addUserRepository.add(user);

		return {
			id: newUser.getId(),
			firstName: newUser.getFirstName(),
			lastName: newUser.getLastName(),
			email: newUser.getEmail(),
			createdAt: newUser.getCreatedAt(),
			updatedAt: newUser.getUpdatedAt()
		};
	}
}
