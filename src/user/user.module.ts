import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/database/database.module";
import { UserRepository } from "./repositories/user.repository";

@Module({
	imports: [DatabaseModule],
	providers: [UserRepository],
	exports: [UserRepository]
})
export class UserModule {}
