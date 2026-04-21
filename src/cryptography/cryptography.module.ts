import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Env } from "@/env.validation";
import { HashGenerator } from "./protocols/hash-generator.protocol";
import { BCryptService } from "./services/bcrypt.service";

@Module({
	providers: [
		{
			provide: HashGenerator,
			inject: [ConfigService],
			useFactory: (config: ConfigService<Env, true>) => {
				const salt = config.get("SALT", { infer: true });

				return new BCryptService(salt);
			}
		}
	],
	exports: [HashGenerator]
})
export class CryptographyModule {}
