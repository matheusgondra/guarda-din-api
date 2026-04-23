import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";
import { LoginUseCase } from "@/domain/usecases/login.usecase";
import { LoginRequestDTO } from "../dto/login-request.dto";
import { LoginResponseDTO } from "../dto/login-response.dto";

@Controller("login")
export class LoginController {
	private readonly logger = new Logger(LoginController.name);

	constructor(private readonly service: LoginUseCase) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	async handle(@Body() dto: LoginRequestDTO): Promise<LoginResponseDTO> {
		this.logger.debug("Received login request", { dto });

		const result = await this.service.execute(dto);

		this.logger.debug("Login successful", { result });

		return new LoginResponseDTO(result.accessToken);
	}
}
