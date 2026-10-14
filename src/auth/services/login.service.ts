import { Injectable } from "@nestjs/common";
import { HashComparer } from "@/cryptography/protocols/hash-comparer.protocol.js";
import { TokenGenerator } from "@/cryptography/protocols/token-generator.protocol.js";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials.error.js";
import { LoginParam, LoginResult, LoginUseCase } from "@/domain/usecases/auth/login.usecase.js";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol.js";

@Injectable()
export class LoginService implements LoginUseCase {
	constructor(
		private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
		private readonly hashComparer: HashComparer,
		private readonly tokenGenerator: TokenGenerator
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

		const accessToken = await this.tokenGenerator.generateToken(user.getId());

		return { accessToken };
	}
}
