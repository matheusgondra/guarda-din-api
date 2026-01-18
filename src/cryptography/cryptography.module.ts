import { Module } from "@nestjs/common";
import { HashGenerator } from "./protocols/hash-generator.protocol";
import { BCryptService } from "./services/bcrypt.service";

@Module({
	providers: [
		{
			provide: HashGenerator,
			useClass: BCryptService
		}
	],
	exports: [HashGenerator]
})
export class CryptographyModule {}
