import { AddExpenseUseCase } from "@domain/usecases/expense/add-expense.usecase";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/database/database.module";
import { AddExpenseService } from "./services/add-expense.service";

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: AddExpenseUseCase,
			useClass: AddExpenseService
		}
	],
	exports: [AddExpenseUseCase]
})
export class ExpenseModule {}
