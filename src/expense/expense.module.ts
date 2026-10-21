import { AddExpenseUseCase } from "@domain/usecases/expense/add-expense.usecase.js";
import { Module } from "@nestjs/common";
import { AuthModule } from "@/auth/auth.module.js";
import { CryptographyModule } from "@/cryptography/cryptography.module.js";
import { DatabaseModule } from "@/database/database.module.js";
import { LoadExpenseUseCase } from "@/domain/usecases/expense/load-expense.usecase.js";
import { AddExpenseController } from "./controllers/add-expense.controller.js";
import { LoadExpensesController } from "./controllers/load-expenses.controller.js";
import { AddExpenseRepository } from "./protocols/add-expense-repository.protocol.js";
import { CountExpensesRepository } from "./protocols/count-expenses-repository.protocol.js";
import { LoadExpenseRepository } from "./protocols/load-expense-repository.protocol.js";
import { ExpenseRepository } from "./repositories/expense.repository.js";
import { AddExpenseService } from "./services/add-expense.service.js";
import { LoadExpenseService } from "./services/load-expense.service.js";

@Module({
	imports: [DatabaseModule, AuthModule, CryptographyModule],
	controllers: [AddExpenseController, LoadExpensesController],
	providers: [
		{
			provide: AddExpenseUseCase,
			useClass: AddExpenseService
		},
		{
			provide: AddExpenseRepository,
			useClass: ExpenseRepository
		},
		{
			provide: LoadExpenseRepository,
			useClass: ExpenseRepository
		},
		{
			provide: CountExpensesRepository,
			useClass: ExpenseRepository
		},
		{
			provide: LoadExpenseUseCase,
			useClass: LoadExpenseService
		}
	]
})
export class ExpenseModule {}
