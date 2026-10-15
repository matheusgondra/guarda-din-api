import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Env } from "@/env.validation.js";
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
		}
	],
	exports: [PrismaService]
})
export class DatabaseModule {}
