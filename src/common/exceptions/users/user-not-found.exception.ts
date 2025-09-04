import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../error-codes.enum';
import { BaseException } from '../base.exceptions';

export class UserNotFoundException extends BaseException {
    constructor(userId?: string) {
        super(
            ErrorCode.USER_NOT_FOUND,
            HttpStatus.NOT_FOUND,
            userId ? `User with id ${userId} not found` : undefined,
        );
    }
}
