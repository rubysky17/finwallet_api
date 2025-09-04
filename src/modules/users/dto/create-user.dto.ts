import { IsEmail, IsString, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsString({ message: 'First name is required' })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    @MaxLength(50, { message: 'First name cannot exceed 50 characters' })
    firstName: string;

    @IsString({ message: 'Last name is required' })
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    @MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
    lastName: string;

    @IsString({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
            message:
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
    )
    password: string;

    @IsOptional()
    @IsString({ message: 'Phone number must be a string' })
    phoneNumber?: string;
} 