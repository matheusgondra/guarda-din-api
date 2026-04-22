import { applyDecorators } from "@nestjs/common";
import { ApiConflictResponse } from "@nestjs/swagger";
import { ErrorResponseDTO } from "../dto/error-response.dto";

export const ApiConflict = () =>
	applyDecorators(
		ApiConflictResponse({
			description: "User already exists",
			type: ErrorResponseDTO,
			example: {
				statusCode: 409,
				message: "User already exists",
				timestamp: "2024-01-01T00:00:00.000Z"
			}
		})
	);
