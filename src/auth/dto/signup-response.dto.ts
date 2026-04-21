export class SignupResponseDTO {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(param: SignupResponseDTO) {
		this.id = param.id;
		this.firstName = param.firstName;
		this.lastName = param.lastName;
		this.email = param.email;
		this.createdAt = param.createdAt;
		this.updatedAt = param.updatedAt;
	}
}
