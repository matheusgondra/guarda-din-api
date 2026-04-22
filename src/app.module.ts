import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ZodSerializerInterceptor, ZodValidationPipe } from "nestjs-zod";
import { AuthModule } from "./auth/auth.module";
import { CustomZodValidationPipe } from "./common/pipes/custom-zod-validation.pipe";
import { validateEnv } from "./env.validation";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationOptions: {
				allowUnknown: false,
				abortEarly: true
			},
			validate: validateEnv
		}),
		AuthModule
	],
	providers: [
		{
			provide: APP_PIPE,
			useClass: CustomZodValidationPipe
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ZodSerializerInterceptor
		}
	]
})
export class AppModule {}
