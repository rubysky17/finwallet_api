import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-codes.enum';
import { ErrorMessages } from './error-messages.map';

export class BaseException extends HttpException {
    constructor(
        public readonly errorCode: ErrorCode,
        statusCode: HttpStatus,
        message?: string,
    ) {
        super(
            {
                statusCode,
                errorCode,
                message: message || ErrorMessages[errorCode],
            },
            statusCode,
        );
    }
}
