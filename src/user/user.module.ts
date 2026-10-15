import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/database/database.module.js";
import { AddUserRepository } from "./protocols/add-user-repository.protocol.js";
import { LoadUserByEmailRepository } from "./protocols/load-user-by-email-repository.protocol.js";
import { UserRepository } from "./repositories/user.repository.js";

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: LoadUserByEmailRepository,
			useClass: UserRepository
		},
		{
			provide: AddUserRepository,
			useClass: UserRepository
		}
	],
	exports: [LoadUserByEmailRepository, AddUserRepository]
})
export class UserModule {}
