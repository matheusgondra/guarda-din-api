import { AddExpenseUseCase } from "@domain/usecases/expense/add-expense.usecase.js";
import { Module } from "@nestjs/common";
import { AuthModule } from "@/auth/auth.module.js";
import { CryptographyModule } from "@/cryptography/cryptography.module.js";
import { DatabaseModule } from "@/database/database.module.js";
import { AddExpenseController } from "./controllers/add-expense.controller.js";
import { AddExpenseService } from "./services/add-expense.service.js";

@Module({
	imports: [DatabaseModule, AuthModule, CryptographyModule],
	controllers: [AddExpenseController],
	providers: [
		{
			provide: AddExpenseUseCase,
			useClass: AddExpenseService
		}
	],
	exports: [AddExpenseUseCase]
})
export class ExpenseModule {}
