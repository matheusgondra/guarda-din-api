import { applyDecorators } from "@nestjs/common";
import { ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ErrorResponseDTO } from "../dto/error-response.dto";

export const ApiUnauthorized = () =>
	applyDecorators(
		ApiUnauthorizedResponse({
			description: "Unauthorized",
			type: ErrorResponseDTO,
			example: {
				statusCode: 401,
				message: "Invalid credentials",
				timestamp: "2024-01-01T00:00:00.000Z"
			}
		})
	);
