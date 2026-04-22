import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { UserAlreadyExistsError } from "@/domain/errors/user-already-exists.error";

@Catch(UserAlreadyExistsError)
export class ConflictExceptionFilter implements ExceptionFilter {
	catch(exception: UserAlreadyExistsError, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();

		const status = 409;

		response.status(status).json({
			statusCode: status,
			message: exception.message || "Conflict",
			timestamp: new Date().toISOString()
		});
	}
}
