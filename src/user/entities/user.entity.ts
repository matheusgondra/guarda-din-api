type UserData = {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export class User {
	private id: string;
	private firstName: string;
	private lastName: string;
	private email: string;
	private password: string;
	private createdAt: Date;
	private updatedAt: Date;

	constructor(userData: UserData) {
		this.id = userData.id || "";
		this.firstName = userData.firstName;
		this.lastName = userData.lastName;
		this.email = userData.email;
		this.password = userData.password;
		this.createdAt = userData.createdAt || new Date();
		this.updatedAt = userData.updatedAt || new Date();
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

	getCreatedAt(): Date {
		return new Date(this.createdAt);
	}

	getUpdatedAt(): Date {
		return new Date(this.updatedAt);
	}
}
