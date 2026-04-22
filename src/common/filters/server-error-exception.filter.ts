import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";
import { ErrorResponseDTO } from "../dto/error-response.dto";

@Catch()
export class ServerErrorExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(ServerErrorExceptionFilter.name);

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		if (exception instanceof HttpException) {
			const status = exception.getStatus();
			const exceptionResponse = exception.getResponse();

			this.logger.error(exception.message, exception.stack);

			if (typeof exceptionResponse === "string") {
				return response.status(status).json({
					statusCode: status,
					message: exceptionResponse,
					timestamp: new Date().toISOString()
				});
			}

			return response.status(status).json({
				timestamp: new Date().toISOString(),
				...exceptionResponse
			});
		}

		if (exception instanceof Error) {
			this.logger.error(exception.message, exception.stack);
		}

		const errorResponse = new ErrorResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");

		return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
	}
}
