import { Body, Controller, Logger, Post } from "@nestjs/common";
import { SignupUseCase } from "@/domain/usecases/signup.usecase";
import { SignupRequestDTO } from "../dto/signup-request.dto";
import { SignupResponseDTO } from "../dto/signup-response.dto";

@Controller("api/signup")
export class SignupController {
	private readonly logger = new Logger(SignupController.name);

	constructor(private readonly service: SignupUseCase) {}

	@Post()
	async handle(@Body() dto: SignupRequestDTO): Promise<SignupResponseDTO> {
		this.logger.debug("Received signup request", { dto });

		const result = await this.service.execute(dto);

		this.logger.debug("Signup successful", { result });

		return new SignupResponseDTO(result);
	}
}
