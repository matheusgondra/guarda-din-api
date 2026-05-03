import { User } from "@/user/entities/user.entity";

export class UserMock extends User {
	constructor() {
		super({
			id: "019dee1c-4d82-7a9d-b47d-377debeb7ebd",
			firstName: "any_first_name",
			lastName: "any_last_name",
			email: "any@email.com",
			password: "hasedPassword@123",
			createdAt: new Date("2023-01-01T00:00:00Z"),
			updatedAt: new Date("2023-01-01T00:00:00Z")
		});
	}

	getUserWithoutPassword() {
		return {
			id: this.getId(),
			firstName: this.getFirstName(),
			lastName: this.getLastName(),
			email: this.getEmail(),
			createdAt: this.getCreatedAt(),
			updatedAt: this.getUpdatedAt()
		};
	}
}
