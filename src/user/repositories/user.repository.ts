import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/services/prisma.service";
import { User } from "../entities/user.entity";
import { UserMapper } from "../mapper/user.mapper";
import { AddUserRepository } from "../protocols/add-user-repository.protocol";
import { LoadUserByEmailRepository } from "../protocols/load-user-by-email-repository.protocol";

@Injectable()
export class UserRepository implements LoadUserByEmailRepository, AddUserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async loadByEmail(email: string): Promise<User | null> {
		const user = await this.prismaService.user.findUnique({
			where: { email }
		});
		if (!user) {
			return null;
		}

		return UserMapper.toDomain(user);
	}

	async add(user: User): Promise<User> {
		const entity = UserMapper.toEntity(user);
		const createdUserData = {
			...entity,
			id: undefined
		};

		await this.prismaService.user.create({
			data: createdUserData
		});

		return {} as User;
	}
}
