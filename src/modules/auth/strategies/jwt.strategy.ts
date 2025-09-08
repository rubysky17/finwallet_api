import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        try {
            const user = await this.usersService.findById(payload.sub);

            if (user.status !== 'active') {
                throw new UnauthorizedException('Account is not active');
            }

            return {
                id: user.id,
                email: user.email,
                role: user.role,
                status: user.status,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
} 