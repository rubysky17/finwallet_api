import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
// ! Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
// ! Entities
import { UserRole } from './user.entity';
// ! Decorators
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '~/modules/auth/decorators/public.decorator';
import { Token } from '~/modules/auth/decorators/user.decorator';
// ! Decorators
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Quản lý người dùng')
@ApiSecurityAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return {
            message: 'User created successfully',
            data: user,
        };
    }

    @Get()
    // @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    async findAll() {
        const users = await this.usersService.findAll();
        return {
            message: 'Users retrieved successfully',
            data: users,
        };
    }

    @Get('profile')
    async getProfile(@Token() token) {
        const user = await this.usersService.findById(token.id);
        return {
            message: 'Profile retrieved successfully',
            data: user,
        };
    }

    @Public()
    @Get(':id')
    // @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    async findOne(@Param('id') id: number) {
        const user = await this.usersService.findById(id);
        return {
            message: 'User retrieved successfully',
            data: user,
        };
    }

    @Patch('profile')
    async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.update(req.user.id, updateUserDto);
        return {
            message: 'Profile updated successfully',
            data: user,
        };
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.update(id, updateUserDto);
        return {
            message: 'User updated successfully',
            data: user,
        };
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number) {
        await this.usersService.delete(id);
        return {
            message: 'User deleted successfully',
        };
    }

    @Get('active/list')
    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    async findActiveUsers() {
        const users = await this.usersService.findActiveUsers();
        return {
            message: 'Active users retrieved successfully',
            data: users,
        };
    }

    @Get('role/:role')
    @Roles(UserRole.ADMIN)
    async findUsersByRole(@Param('role') role: UserRole) {
        const users = await this.usersService.findUsersByRole(role);
        return {
            message: `Users with role ${role} retrieved successfully`,
            data: users,
        };
    }

    @Get('stats/count')
    @Roles(UserRole.ADMIN)
    async countUsers() {
        const count = await this.usersService.countUsers();
        return {
            message: 'User count retrieved successfully',
            data: { count },
        };
    }

    @Get('check-email/:email')
    async checkEmailAvailability(@Param('email') email: string) {
        const isAvailable = await this.usersService.isEmailAvailable(email);
        return {
            message: 'Email availability checked successfully',
            data: { isAvailable },
        };
    }
} 
