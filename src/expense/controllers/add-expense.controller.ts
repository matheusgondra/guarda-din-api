import { Body, Controller, Logger, Post } from "@nestjs/common";
import { Auth } from "@/auth/decorators/auth.decorator";
import { Category } from "@/domain/models/category";
import { Money } from "@/domain/models/money";
import { AddExpenseUseCase } from "@/domain/usecases/expense/add-expense.usecase";
import { User } from "@/user/decorators/user.decorator";
import { AddExpenseRequestDTO } from "../dto/add-expense-request.dto";
import { AddExpenseResponseDTO } from "../dto/add-expense-response.dto";

@Auth()
@Controller("expense")
export class AddExpenseController {
	private readonly logger = new Logger(AddExpenseController.name);

	constructor(private readonly service: AddExpenseUseCase) {}

	@Post("add")
	async handle(@Body() dto: AddExpenseRequestDTO, @User() userId: string): Promise<AddExpenseResponseDTO> {
		const param = {
			amount: new Money(dto.amount),
			description: dto.description,
			date: new Date(dto.date),
			category: Category.from(dto.category),
			userId
		};

		this.logger.debug({ param, userId });

		const result = await this.service.execute(param);

		this.logger.debug("AddExpenseUseCase result: ", result);

		return new AddExpenseResponseDTO({
			...result,
			category: result.category.getValue(),
			amount: result.amount.getValue().toNumber()
		});
	}
}
