import jwt from "jsonwebtoken";
import { TokenGenerator } from "../protocols/token-generator.protocol";

export class JwtService implements TokenGenerator {
	constructor(private readonly secret: string) {}

	async generateToken(payload: string): Promise<string> {
		return jwt.sign({ sub: payload }, this.secret, { expiresIn: "1h" });
	}
}
