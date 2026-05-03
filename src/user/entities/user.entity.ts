import { z } from "zod";

const userDataSchema = z.object({
	id: z.uuidv7().optional(),
	firstName: z.string().min(2).max(100),
	lastName: z.string().min(2).max(100),
	email: z.email(),
	password: z.string().min(6).max(100),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});

type UserData = z.infer<typeof userDataSchema>;

export class User {
	private id: string;
	private firstName: string;
	private lastName: string;
	private email: string;
	private password: string;
	private createdAt: Date;
	private updatedAt: Date;

	constructor(userData: UserData) {
		const parsedData = userDataSchema.parse(userData);
		this.id = parsedData.id || "";
		this.firstName = parsedData.firstName;
		this.lastName = parsedData.lastName;
		this.email = parsedData.email;
		this.password = parsedData.password;
		this.createdAt = parsedData.createdAt || new Date();
		this.updatedAt = parsedData.updatedAt || new Date();
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
