import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @ApiProperty({ example: 'user@example.com', description: 'Email' })
    email: string;

    @IsString({ message: 'Password is required' })
    @MinLength(1, { message: 'Password cannot be empty' })
    @ApiProperty({ example: 'SecurePass123!', description: 'Password' })
    password: string;
} 