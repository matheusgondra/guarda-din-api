export abstract class HashComparer {
	abstract compare(value: string, hash: string): Promise<boolean>;
}
