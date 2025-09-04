import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCode } from '../exceptions/error-codes.enum';
import { ErrorMessages } from '../exceptions/error-messages.map';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
        let message = ErrorMessages[ErrorCode.INTERNAL_SERVER_ERROR];

        if (exception instanceof HttpException) {
            const resObj = exception.getResponse() as any;
            status = exception.getStatus();
            errorCode = resObj?.errorCode || errorCode;
            message = resObj?.message || message;
        }

        this.logger.error(
            `[${req.method}] ${req.url} → ${message}`,
            exception instanceof Error ? exception.stack : '',
            'ExceptionFilter',
        );

        res.status(status).json({
            statusCode: status,
            errorCode,
            message,
            timestamp: new Date().toISOString(),
            path: req.url,
        });
    }
}
