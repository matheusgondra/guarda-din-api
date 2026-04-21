import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/services/prisma.service";
import { User } from "../entities/user.entity";
import { UserMapper } from "../mapper/user.mapper";
import { LoadUserByEmailRepository } from "../protocols/load-user-by-email-repository.protocol";

@Injectable()
export class UserRepository implements LoadUserByEmailRepository {
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
}
