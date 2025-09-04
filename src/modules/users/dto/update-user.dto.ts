import { IsEmail, IsString, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { UserStatus } from '../user.entity';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'First name must be a string' })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    @MaxLength(50, { message: 'First name cannot exceed 50 characters' })
    firstName?: string;

    @IsOptional()
    @IsString({ message: 'Last name must be a string' })
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
    lastName?: string;

    @IsOptional()
    @IsString({ message: 'Phone number must be a string' })
    phoneNumber?: string;

    @IsOptional()
    @IsString({ message: 'Avatar must be a string' })
    avatar?: string;

    @IsOptional()
    @IsEnum(UserStatus, { message: 'Invalid status value' })
    status?: UserStatus;
} 