import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { HashGenerator } from "../protocols/hash-generator.protocol";

@Injectable()
export class BCryptService implements HashGenerator {
	constructor(private readonly salt: number) {}

	async generate(value: string): Promise<string> {
		return bcrypt.hash(value, this.salt);
	}
}
