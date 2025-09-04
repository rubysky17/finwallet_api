import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User, UserRole, UserStatus } from '../users/user.entity';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    const mockUser: Partial<User> = {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        emailVerified: true,
        validatePassword: jest.fn().mockResolvedValue(true),
    };

    const mockUsersService = {
        findByEmail: jest.fn(),
        create: jest.fn(),
        updateLastLogin: jest.fn(),
        findById: jest.fn(),
    };

    const mockJwtService = {
        sign: jest.fn(),
        verify: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('should validate user successfully', async () => {
            mockUsersService.findByEmail.mockResolvedValue(mockUser);

            const result = await service.validateUser('test@example.com', 'password');

            expect(result).toEqual(mockUser);
            expect(mockUsersService.findByEmail).toHaveBeenCalledWith('test@example.com');
        });
    });

    describe('login', () => {
        it('should return login response with token', async () => {
            const mockToken = 'mock.jwt.token';
            mockJwtService.sign.mockReturnValue(mockToken);
            mockUsersService.updateLastLogin.mockResolvedValue(undefined);

            const result = await service.login(mockUser as User);

            expect(result.access_token).toBe(mockToken);
            expect(result.user).toBeDefined();
            expect(mockJwtService.sign).toHaveBeenCalled();
            expect(mockUsersService.updateLastLogin).toHaveBeenCalledWith(mockUser.id);
        });
    });
}); 