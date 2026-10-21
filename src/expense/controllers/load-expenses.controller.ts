import { Controller, Get, Logger, Query } from "@nestjs/common";
import { PageDTO } from "@/common/dto/page.dto.js";
import { PageMetaDTO } from "@/common/dto/page-meta.dto.js";
import { PaginationDTO } from "@/common/dto/pagination.dto.js";
import { LoadExpenseUseCase } from "@/domain/usecases/expense/load-expense.usecase.js";
import { User } from "@/user/decorators/user.decorator.js";
import { ExpenseDetailsDTO } from "../dto/expense-details.dto.js";

@Controller("expense")
export class LoadExpensesController {
	private readonly logger = new Logger(LoadExpensesController.name);

	constructor(private readonly useCase: LoadExpenseUseCase) {}

	@Get()
	async handle(@Query() paginationDTO: PaginationDTO, @User() userId: string): Promise<PageDTO<ExpenseDetailsDTO>> {
		const { page, limit } = paginationDTO;

		this.logger.debug({ userId, page, limit });

		const result = await this.useCase.execute({ userId, page, pageSize: limit });

		this.logger.debug("LoadExpenseUseCase result: ", result);

		const expenseDetails = result.data.map((expense) => ({
			...expense,
			amount: expense.amount.getValue().toNumber()
		}));

		this.logger.debug("Expense details: ", expenseDetails);

		const pageMeta = new PageMetaDTO({
			page: result.page,
			pageSize: result.pageSize,
			totalElements: result.total
		});

		return new PageDTO(expenseDetails, pageMeta);
	}
}
