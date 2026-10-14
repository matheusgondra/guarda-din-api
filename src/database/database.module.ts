import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Env } from "@/env.validation.js";
import { AddExpenseRepository } from "@/expense/protocols/add-expense-repository.protocol.js";
import { ExpenseRepository } from "@/expense/repositories/expense.repository.js";
import { AddUserRepository } from "@/user/protocols/add-user-repository.protocol.js";
import { LoadUserByEmailRepository } from "@/user/protocols/load-user-by-email-repository.protocol.js";
import { UserRepository } from "@/user/repositories/user.repository.js";
import { PrismaService } from "./services/prisma.service.js";

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
		},
		{
			provide: AddExpenseRepository,
			useClass: ExpenseRepository
		}
	],
	exports: [PrismaService, LoadUserByEmailRepository, AddUserRepository, AddExpenseRepository]
})
export class DatabaseModule {}
