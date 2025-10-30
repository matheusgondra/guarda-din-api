export class User {
	private id: string;
	private firstName: string;
	private lastName: string;
	private email: string;
	private password: string;
	private createdAt: Date;
	private updatedAt: Date;

	constructor(
		id: string,
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		createdAt: Date,
		updatedAt: Date
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	getId(): string {
		return this.id;
	}

	getFirstName(): string {
		return this.firstName;
	}

	getLastName(): string {
		return this.lastName;
	}

	getEmail(): string {
		return this.email;
	}

	getPassword(): string {
		return this.password;
	}
}
