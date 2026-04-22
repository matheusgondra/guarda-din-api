import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { UserAlreadyExistsError } from "@/domain/errors/user-already-exists.error";
import { ErrorResponseDTO } from "../dto/error-response.dto";

@Catch(UserAlreadyExistsError)
export class ConflictExceptionFilter implements ExceptionFilter {
	catch(exception: UserAlreadyExistsError, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();

		const errorResponse = new ErrorResponseDTO(HttpStatus.CONFLICT, exception.message);

		response.status(HttpStatus.CONFLICT).json(errorResponse);
	}
}
