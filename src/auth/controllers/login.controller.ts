import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ApiBadRequest } from "@/common/docs/api-bad-request.js";
import { ApiUnauthorized } from "@/common/docs/api-unauthorized.js";
import { LoginUseCase } from "@/domain/usecases/auth/login.usecase.js";
import { LoginRequestDTO } from "../dto/login-request.dto.js";
import { LoginResponseDTO } from "../dto/login-response.dto.js";

@ApiTags("Auth")
@Controller("login")
export class LoginController {
	private readonly logger = new Logger(LoginController.name);

	constructor(private readonly service: LoginUseCase) {}

	@ApiOkResponse({
		description: "Login successful",
		type: LoginResponseDTO,
		example: {
			accessToken:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
		}
	})
	@ApiUnauthorized()
	@ApiBadRequest()
	@Post()
	@HttpCode(HttpStatus.OK)
	async handle(@Body() dto: LoginRequestDTO): Promise<LoginResponseDTO> {
		this.logger.debug("Received login request", { dto });

		const result = await this.service.execute(dto);

		this.logger.debug("Login successful", { result });

		return new LoginResponseDTO(result.accessToken);
	}
}
