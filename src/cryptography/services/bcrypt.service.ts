import { Injectable } from "@nestjs/common";
import bcrypt from "bcryptjs";
import { HashComparer } from "../protocols/hash-comparer.protocol";
import { HashGenerator } from "../protocols/hash-generator.protocol";

@Injectable()
export class BCryptService implements HashGenerator, HashComparer {
	constructor(private readonly salt: number) {}

	async generate(value: string): Promise<string> {
		return bcrypt.hash(value, this.salt);
	}

	async compare(value: string, hash: string): Promise<boolean> {
		return bcrypt.compare(value, hash);
	}
}
