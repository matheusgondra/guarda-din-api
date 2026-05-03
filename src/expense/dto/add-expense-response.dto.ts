import { Category } from "@/domain/models/category";
import { Money } from "@/domain/models/money";

export class AddExpenseResponseDTO {
	id: string;
	date: Date;
	amount: number;
	description: string;
	category: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(param: AddExpenseResponseDTO) {
		this.id = param.id;
		this.date = param.date;
		this.amount = param.amount;
		this.description = param.description;
		this.category = param.category;
		this.createdAt = param.createdAt;
		this.updatedAt = param.updatedAt;
	}
}
