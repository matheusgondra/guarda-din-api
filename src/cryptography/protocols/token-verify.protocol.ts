import { TokenPayloadDTO } from "../dto/token-payload.dto";

export abstract class TokenVerify {
  abstract verify(token: string): Promise<TokenPayloadDTO>;
}