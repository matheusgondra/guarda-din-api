import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse } from "@nestjs/swagger";
import { ValidationErrorResponseDTO } from "../dto/validation-error-response.dto";

export const ApiBadRequest = () =>
	applyDecorators(
		ApiBadRequestResponse({
			description: "Validation failed",
			type: ValidationErrorResponseDTO,
			example: {
				statusCode: 400,
				message: "Validation failed",
				errors: [
					{
						field: "email",
						message: "Invalid email address"
					}
				],
				timestamp: "2024-01-01T00:00:00.000Z"
			}
		})
	);
