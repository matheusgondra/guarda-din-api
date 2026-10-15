import { Module } from "@nestjs/common";
import { CryptographyModule } from "@/cryptography/cryptography.module.js";
import { LoginUseCase } from "@/domain/usecases/auth/login.usecase.js";
import { SignupUseCase } from "@/domain/usecases/auth/signup.usecase.js";
import { UserModule } from "@/user/user.module.js";
import { LoginController } from "./controllers/login.controller.js";
import { SignupController } from "./controllers/signup.controller.js";
import { LoginService } from "./services/login.service.js";
import { SignupService } from "./services/signup.service.js";

@Module({
	imports: [UserModule, CryptographyModule],
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
