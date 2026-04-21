import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
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
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
