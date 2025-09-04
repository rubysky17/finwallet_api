import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto';
import { CreateUserDto } from '../users/dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() createUserDto: CreateUserDto) {
        const result = await this.authService.register(createUserDto);
        return {
            message: 'User registered successfully',
            data: result,
        };
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    async login(@Request() req, @Body() loginDto: LoginDto) {
        const result = await this.authService.login(req.user);
        return {
            message: 'Login successful',
            data: result,
        };
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Request() req) {
        const result = await this.authService.refreshToken(req.user);
        return {
            message: 'Token refreshed successfully',
            data: result,
        };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async logout() {
        return {
            message: 'Logout successful',
        };
    }

    @Post('verify')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async verifyToken(@Request() req) {
        return {
            message: 'Token is valid',
            data: {
                user: req.user,
            },
        };
    }
} 