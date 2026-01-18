import { User } from "@/user/entities/user.entity";

export class UserMock extends User {
	constructor() {
		super({
			id: "any_id",
			firstName: "any_first_name",
			lastName: "any_last_name",
			email: "any@email.com",
			password: "hashed_password",
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
