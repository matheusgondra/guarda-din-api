import { User as UserEntity } from "@/generated/prisma/client";
import { User } from "../entities/user.entity";

export class UserMapper {
	static toDomain(entity: UserEntity): User {
		return new User({
			id: entity.id,
			firstName: entity.firstName,
			lastName: entity.lastName,
			email: entity.email,
			password: entity.password,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt
		});
	}

	static toEntity(domain: User): UserEntity {
		return {
			id: domain.getId(),
			firstName: domain.getFirstName(),
			lastName: domain.getLastName(),
			email: domain.getEmail(),
			password: domain.getPassword(),
			createdAt: domain.getCreatedAt(),
			updatedAt: domain.getUpdatedAt()
		};
	}
}
