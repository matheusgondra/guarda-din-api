import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Env } from "@/env.validation.js";
import { HashComparer } from "./protocols/hash-comparer.protocol.js";
import { HashGenerator } from "./protocols/hash-generator.protocol.js";
import { TokenGenerator } from "./protocols/token-generator.protocol.js";
import { TokenVerify } from "./protocols/token-verify.protocol.js";
import { BCryptService } from "./services/bcrypt.service.js";
import { JwtService } from "./services/jwt.service.js";

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
		},
		{
			provide: TokenVerify,
			useExisting: TokenGenerator
		}
	],
	exports: [HashGenerator, HashComparer, TokenGenerator, TokenVerify]
})
export class CryptographyModule {}
