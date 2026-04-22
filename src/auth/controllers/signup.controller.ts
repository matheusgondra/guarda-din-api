import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ApiBadRequest } from "@/common/docs/api-bad-request";
import { ApiConflict } from "@/common/docs/api-conflict";
import { SignupUseCase } from "@/domain/usecases/signup.usecase";
import { SignupRequestDTO } from "../dto/signup-request.dto";
import { SignupResponseDTO } from "../dto/signup-response.dto";

@ApiTags("Auth")
@Controller("signup")
export class SignupController {
	private readonly logger = new Logger(SignupController.name);

	constructor(private readonly service: SignupUseCase) {}

	@ApiCreatedResponse({
		description: "User created successfully",
		type: SignupResponseDTO,
		example: {
			id: "123e4567-e89b-12d3-a456-426614174000",
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@email.com",
			password: "StrongPassword123!",
			createdAt: "2024-01-01T00:00:00.000Z",
			updatedAt: "2024-01-01T00:00:00.000Z"
		}
	})
	@ApiConflict()
	@ApiBadRequest()
	@Post()
	async handle(@Body() dto: SignupRequestDTO): Promise<SignupResponseDTO> {
		this.logger.debug("Received signup request", { dto });

		const result = await this.service.execute(dto);

		this.logger.debug("Signup successful", { result });

		return new SignupResponseDTO(result);
	}
}
