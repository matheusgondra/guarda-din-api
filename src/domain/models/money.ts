import { Decimal } from "decimal.js";

export class Money {
	private readonly value: Decimal;

	constructor(value: number) {
		this.value = new Decimal(value);
	}

	getValue(): Decimal {
		return this.value;
	}
}
