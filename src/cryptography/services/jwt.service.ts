import jwt from "jsonwebtoken";
import { TokenPayloadDTO } from "../dto/token-payload.dto";
import { TokenGenerator } from "../protocols/token-generator.protocol";
import { TokenVerify } from "../protocols/token-verify.protocol";

type JwtPayload = {
	sub: string;
	exp: number;
	iat: number;
};

export class JwtService implements TokenGenerator, TokenVerify {
	constructor(private readonly secret: string) {}

	async generateToken(payload: string): Promise<string> {
		return jwt.sign({ sub: payload }, this.secret, { expiresIn: "1h" });
	}

	async verify(token: string): Promise<TokenPayloadDTO> {
		const payload = jwt.verify(token, this.secret) as JwtPayload;
		return new TokenPayloadDTO(payload.sub, payload.exp, payload.iat);
	}
}
