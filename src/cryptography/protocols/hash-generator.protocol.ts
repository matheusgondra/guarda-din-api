export abstract class HashGenerator {
	abstract generate(value: string): Promise<string>;
}
