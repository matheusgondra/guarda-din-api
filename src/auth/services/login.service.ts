import { Injectable } from "@nestjs/common";
import { LoginParam, LoginResult, LoginUseCase } from "@/domain/usecases/login.usecase";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol";

@Injectable()
export class LoginService implements LoginUseCase {
	constructor(private readonly loadUserByEmailRepository: LoadUserByEmailRepository) {}

	async execute({ email }: LoginParam): Promise<LoginResult> {
		await this.loadUserByEmailRepository.loadByEmail(email);
		return {} as LoginResult;
	}
}
