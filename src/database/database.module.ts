import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Env } from "@/env.validation";
import { AddUserRepository } from "@/user/protocols/add-user-repository.protocol";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol";
import { UserRepository } from "@/user/repositories/user.repository";
import { PrismaService } from "./services/prisma.service";

@Module({
	providers: [
		{
			provide: PrismaService,
			inject: [ConfigService],
			useFactory: (config: ConfigService<Env, true>) => {
				const url = config.get("DATABASE_URL", { infer: true });
				const prisma = new PrismaService(url);
				return prisma;
			}
		},
		{
			provide: LoadUserByEmailRepository,
			useClass: UserRepository
		},
		{
			provide: AddUserRepository,
			useClass: UserRepository
		}
	],
	exports: [PrismaService, LoadUserByEmailRepository, AddUserRepository]
})
export class DatabaseModule {}
