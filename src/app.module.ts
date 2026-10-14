import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ZodSerializerInterceptor } from "nestjs-zod";
import { AuthModule } from "./auth/auth.module.js";
import { ConflictExceptionFilter } from "./common/filters/conflict-exception.filter.js";
import { ServerErrorExceptionFilter } from "./common/filters/server-error-exception.filter.js";
import { UnauthorizedExceptionFilter } from "./common/filters/unauthorized-exception.filter.js";
import { CustomZodValidationPipe } from "./common/pipes/custom-zod-validation.pipe.js";
import { validateEnv } from "./env.validation.js";
import { ExpenseModule } from "./expense/expense.module.js";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationOptions: {
				libraryOptions: {
					allowUnknown: false,
					abortEarly: true
				}
			},
			envFilePath: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
			validate: validateEnv
		}),
		AuthModule,
		ExpenseModule
	],
	providers: [
		{
			provide: APP_PIPE,
			useClass: CustomZodValidationPipe
		},
		{
			provide: APP_FILTER,
			useClass: ServerErrorExceptionFilter
		},
		{
			provide: APP_FILTER,
			useClass: ConflictExceptionFilter
		},
		{
			provide: APP_FILTER,
			useClass: UnauthorizedExceptionFilter
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ZodSerializerInterceptor
		}
	]
})
export class AppModule {}
