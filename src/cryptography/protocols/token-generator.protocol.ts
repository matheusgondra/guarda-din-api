export abstract class TokenGenerator {
	abstract generateToken(payload: string): Promise<string>;
}
