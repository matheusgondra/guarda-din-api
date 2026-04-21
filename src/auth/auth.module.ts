import { Module } from "@nestjs/common";
import { SignupUseCase } from "@/domain/usecases/signup.usecase";
import { SignupService } from "./services/signup.service";

@Module({
	providers: [
		{
			provide: SignupUseCase,
			useClass: SignupService
		}
	]
})
export class AuthModule {}
