// src/common/exceptions/error-messages.map.ts
import { ErrorCode } from './error-codes.enum';

export const ErrorMessages: Record<ErrorCode, string> = {
    [ErrorCode.USER_NOT_FOUND]: 'User not found',
    [ErrorCode.USER_EMAIL_EXISTS]: 'Email already exists',
    [ErrorCode.INVALID_CREDENTIALS]: 'Invalid credentials',
    [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
};
