import { AddExpenseUseCase } from "@domain/usecases/expense/add-expense.usecase";
import { Module } from "@nestjs/common";
import { AuthModule } from "@/auth/auth.module";
import { CryptographyModule } from "@/cryptography/cryptography.module";
import { DatabaseModule } from "@/database/database.module";
import { AddExpenseController } from "./controllers/add-expense.controller";
import { AddExpenseService } from "./services/add-expense.service";

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
