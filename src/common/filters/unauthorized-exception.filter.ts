import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials.error";
import { ErrorResponseDTO } from "../dto/error-response.dto";

@Catch(InvalidCredentialsError)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
	catch(exception: InvalidCredentialsError, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();

		const errorResponse = new ErrorResponseDTO(HttpStatus.UNAUTHORIZED, exception.message);

		response.status(HttpStatus.UNAUTHORIZED).json(errorResponse);
	}
}
