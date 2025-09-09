import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto';

import { UsersService } from '../users/users.service';
import { CategoryTemplateService } from '../categoryTemplate/categoryTemplate.service';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
    sub: number;
    email: string;
    role: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: Partial<User>;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly categoryTemplate: CategoryTemplateService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<User> {
        try {
            const user = await this.usersService.findByEmail(email);

            if (user.status !== 'active') {
                throw new UnauthorizedException('Account is not active');
            }

            const isPasswordValid = await user.validatePassword(password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async login(user: User): Promise<LoginResponse> {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        // Access token (short-lived)
        const access_token = this.jwtService.sign(payload);
        // Refresh token (long-lived)
        const refresh_token = this.jwtService.sign(payload, {
            expiresIn: '7d',
        });

        // Update last login time
        await this.usersService.updateLastLogin(user.id);

        return {
            access_token,
            refresh_token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                status: user.status,
                avatar: user.avatar,
                emailVerified: user.emailVerified,
            },
        };
    }

    async register(createUserDto: CreateUserDto): Promise<LoginResponse> {
        const user = await this.usersService.create(createUserDto);
        await this.categoryTemplate.createByUserId(user.id)
        return this.login(user);
    }

    async refreshToken(user: User): Promise<{ access_token: string }> {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async verifyToken(token: string): Promise<JwtPayload> {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
} 