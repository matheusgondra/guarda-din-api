import { Injectable } from "@nestjs/common";
import { UserAlreadyExistsError } from "@/domain/errors/user-already-exists.error";
import { SignupParam, SignupResult, SignupUseCase } from "@/domain/usecases/signup.usecase";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol";

@Injectable()
export class SignupService implements SignupUseCase {
	constructor(private readonly loadUserByEmailRepository: LoadUserByEmailRepository) {}

	async execute(param: SignupParam): Promise<SignupResult> {
		const userAlreadyExists = await this.loadUserByEmailRepository.execute(param.email);
		if (userAlreadyExists) {
			throw new UserAlreadyExistsError();
		}

		return null;
	}
}
