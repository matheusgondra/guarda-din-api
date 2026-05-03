import { z } from "zod";
import { Category } from "@/domain/models/category";
import { Money } from "@/domain/models/money";

const expenseDataSchema = z.object({
	id: z.uuidv7().optional(),
	date: z.date(),
	amount: z.instanceof(Money),
	description: z.string(),
	category: z.enum(Object.values(Category)),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});

type ExpenseData = z.infer<typeof expenseDataSchema>;

export class Expense {
	private id: string;
	private date: Date;
	private amount: Money;
	private description: string;
	private category: Category;
	private createdAt: Date;
	private updatedAt: Date;

	constructor(expenseData: ExpenseData) {
		const parsedData = expenseDataSchema.parse(expenseData);
		this.id = parsedData.id || "";
		this.date = parsedData.date;
		this.amount = parsedData.amount;
		this.description = parsedData.description;
		this.category = parsedData.category;
		this.createdAt = parsedData.createdAt || new Date();
		this.updatedAt = parsedData.updatedAt || new Date();
	}

	getId(): string {
		return this.id;
	}

	getDate(): Date {
		return this.date;
	}

	getAmount(): Money {
		return this.amount;
	}

	getDescription(): string {
		return this.description;
	}

	getCategory(): Category {
		return this.category;
	}

	getCreatedAt(): Date {
		return this.createdAt;
	}

	getUpdatedAt(): Date {
		return this.updatedAt;
	}
}
