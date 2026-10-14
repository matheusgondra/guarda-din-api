import { TokenPayloadDTO } from "../dto/token-payload.dto.js";

export abstract class TokenVerify {
	abstract verify(token: string): Promise<TokenPayloadDTO>;
}
