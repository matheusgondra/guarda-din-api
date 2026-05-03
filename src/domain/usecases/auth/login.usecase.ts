export type LoginParam = {
	email: string;
	password: string;
};

export type LoginResult = {
	accessToken: string;
};

export abstract class LoginUseCase {
	abstract execute(param: LoginParam): Promise<LoginResult>;
}
