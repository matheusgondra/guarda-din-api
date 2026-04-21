import { Module } from "@nestjs/common";
import { CryptographyModule } from "@/cryptography/cryptography.module";
import { DatabaseModule } from "@/database/database.module";
import { SignupUseCase } from "@/domain/usecases/signup.usecase";
import { SignupController } from "./controllers/signup.controller";
import { SignupService } from "./services/signup.service";

@Module({
	imports: [DatabaseModule, CryptographyModule],
	controllers: [SignupController],
	providers: [
		{
			provide: SignupUseCase,
			useClass: SignupService
		}
	]
})
export class AuthModule {}
