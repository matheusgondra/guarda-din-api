import { Injectable } from "@nestjs/common";
import { SignupParam, SignupResult, SignupUseCase } from "@/domain/usecases/signup.usecase";
import { LoadUserByEmailRepository } from "@/user/interfaces/load-user-by-email.repository";

@Injectable()
export class SignupService implements SignupUseCase {
	constructor(private readonly loadUserByEmailRepository: LoadUserByEmailRepository) {}

	async execute(param: SignupParam): Promise<SignupResult> {
		await this.loadUserByEmailRepository.execute(param.email);

		return null;
	}
}
