import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Env } from "@/env.validation";
import { HashComparer } from "./protocols/hash-comparer.protocol";
import { HashGenerator } from "./protocols/hash-generator.protocol";
import { TokenGenerator } from "./protocols/token-generator.protocol";
import { BCryptService } from "./services/bcrypt.service";
import { JwtService } from "./services/jwt.service";

@Module({
	providers: [
		{
			provide: HashGenerator,
			inject: [ConfigService],
			useFactory: (config: ConfigService<Env, true>) => {
				const salt = config.get("SALT", { infer: true });

				return new BCryptService(salt);
			}
		},
		{
			provide: HashComparer,
			useExisting: HashGenerator
		},
		{
			provide: TokenGenerator,
			inject: [ConfigService],
			useFactory: (config: ConfigService<Env, true>) => {
				const secret = config.get("JWT_SECRET", { infer: true });

				return new JwtService(secret);
			}
		}
	],
	exports: [HashGenerator, HashComparer, TokenGenerator]
})
export class CryptographyModule {}
