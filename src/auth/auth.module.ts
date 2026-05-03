import { Module } from "@nestjs/common";
import { CryptographyModule } from "@/cryptography/cryptography.module";
import { DatabaseModule } from "@/database/database.module";
import { LoginUseCase } from "@/domain/usecases/auth/login.usecase";
import { SignupUseCase } from "@/domain/usecases/auth/signup.usecase";
import { LoginController } from "./controllers/login.controller";
import { SignupController } from "./controllers/signup.controller";
import { LoginService } from "./services/login.service";
import { SignupService } from "./services/signup.service";

@Module({
	imports: [DatabaseModule, CryptographyModule],
	controllers: [SignupController, LoginController],
	providers: [
		{
			provide: SignupUseCase,
			useClass: SignupService
		},
		{
			provide: LoginUseCase,
			useClass: LoginService
		}
	]
})
export class AuthModule {}
