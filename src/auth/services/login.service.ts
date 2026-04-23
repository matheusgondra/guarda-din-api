import { Injectable } from "@nestjs/common";
import { HashComparer } from "@/cryptography/protocols/hash-comparer.protocol";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials.error";
import { LoginParam, LoginResult, LoginUseCase } from "@/domain/usecases/login.usecase";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol";

@Injectable()
export class LoginService implements LoginUseCase {
	constructor(
		private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
		private readonly hashComparer: HashComparer
	) {}

	async execute({ email, password }: LoginParam): Promise<LoginResult> {
		const user = await this.loadUserByEmailRepository.loadByEmail(email);
		if (!user) {
			throw new InvalidCredentialsError();
		}

		const isMatch = await this.hashComparer.compare(password, user.getPassword());
		if (!isMatch) {
			throw new InvalidCredentialsError();
		}

		return {} as LoginResult;
	}
}
