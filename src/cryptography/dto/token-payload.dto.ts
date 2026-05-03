export class TokenPayloadDTO {
	private readonly sub: string;
	private readonly expiresIn: number;
	private readonly issuedAt: number;

	constructor(sub: string, expiresIn: number, issuedAt: number) {
		this.sub = sub;
		this.expiresIn = expiresIn;
		this.issuedAt = issuedAt;
	}

	getSubject(): string {
		return this.sub;
	}
}
