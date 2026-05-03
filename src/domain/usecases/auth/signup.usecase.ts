export type SignupParam = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type SignupResult = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
};

export abstract class SignupUseCase {
	abstract execute(param: SignupParam): Promise<SignupResult>;
}
