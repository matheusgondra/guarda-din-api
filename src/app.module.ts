import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ZodSerializerInterceptor } from "nestjs-zod";
import { AuthModule } from "./auth/auth.module";
import { ConflictExceptionFilter } from "./common/filters/conflict-exception.filter";
import { ServerErrorExceptionFilter } from "./common/filters/server-error-exception.filter";
import { UnauthorizedExceptionFilter } from "./common/filters/unauthorized-exception.filter";
import { CustomZodValidationPipe } from "./common/pipes/custom-zod-validation.pipe";
import { validateEnv } from "./env.validation";
import { ExpenseModule } from "./expense/expense.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationOptions: {
				allowUnknown: false,
				abortEarly: true
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
