import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const expenseDetailsSchema = z.object({
	id: z.uuidv7(),
	amount: z.number(),
	date: z.date(),
	description: z.string(),
	category: z.string(),
	createdAt: z.date(),
	updatedAt: z.date()
});

export class ExpenseDetailsDTO extends createZodDto(expenseDetailsSchema) {}
