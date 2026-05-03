import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { TokenVerify } from "@/cryptography/protocols/token-verify.protocol";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly tokenVerify: TokenVerify) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		const authHeader = request.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return false;
		}

		const [, token] = authHeader.split(" ");
		if (!token) {
			return false;
		}

		try {
			const payload = await this.tokenVerify.verify(token);
			request["user"] = payload.getSubject();

			return true;
		} catch {
			return false;
		}
	}
}
