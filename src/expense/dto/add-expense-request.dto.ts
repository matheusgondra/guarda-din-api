import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const addExpenseSchema = z.object({
	amount: z.coerce.number(),
	description: z.string().min(3).max(255),
	date: z.iso.datetime(),
	category: z.string()
});

export class AddExpenseRequestDTO extends createZodDto(addExpenseSchema) {}
