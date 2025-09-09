import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ! Entities
import { User, UserRole, UserStatus } from './user.entity';

// ! DTOs & Entity
import { CreateUserDto, UpdateUserDto } from './dto';
import { WalletType } from '~/modules/wallets/wallet.entity';

// ! Services
import { WalletService } from '~/modules/wallets/wallet.service';
import { UserWalletService } from '~/modules/userWallet/userWallet.service';
import { CategoryTemplateService } from '~/modules/categoryTemplate/categoryTemplate.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly walletService: WalletService,
        private readonly userWalletService: UserWalletService,
        private readonly categoryTemplateService: CategoryTemplateService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // ! Get User With Email
        const existingUser = await this.findUserByEmail(createUserDto.email)
        // ! If exist [Not] allow create User
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const user = this.userRepository.create(createUserDto);
        const userCreated = await this.userRepository.save(user);

        // ! If create success create default wallet
        const walletCreated = await this.walletService.create({
            userId: Number(userCreated.id),
            name: "Cash",
            type: WalletType.BASIC
        });

        // ! After create wallet linked userId and WalletId with userWallet table
        await this.userWalletService.create({
            userId: userCreated.id,
            walletId: walletCreated.id
        })

        await this.categoryTemplateService.createByUserId(userCreated.id)

        return userCreated
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            select: [
                'id',
                'email',
                'firstName',
                'lastName',
                'role',
                'status',
                'avatar',
                'createdAt',
                'categoryTemplates',
            ],
            relations: ['categoryTemplates'],
        });
    }

    async findById(id: number): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { id },
            select: [
                'id',
                'email',
                'firstName',
                'lastName',
                'role',
                'status',
                'avatar',
                'phoneNumber',
                'emailVerified',
                'lastLoginAt',
                'createdAt',
                'updatedAt',
                'categoryTemplates',
            ],
            relations: ['categoryTemplates'],
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const walletList = await this.userWalletService.getWalletByUserId(id)

        return {
            ...user,
            walletList
        };
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { email },
            select: [
                'id',
                'email',
                'firstName',
                'lastName',
                'password',
                'role',
                'status',
                'emailVerified'
            ],
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findById(id);

        // Check if email is being updated and if it's already taken
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingUser = await this.userRepository.findOne({
                where: { email: updateUserDto.email },
            });

            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }
        }

        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async updatePassword(id: number, newPassword: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'password'],
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.password = newPassword;
        await this.userRepository.save(user);
    }

    async updateLastLogin(id: number): Promise<void> {
        await this.userRepository.update(id, {
            lastLoginAt: new Date(),
        });
    }

    async updateStatus(id: number, status: UserStatus): Promise<User> {
        const user = await this.findById(id);
        user.status = status;
        return await this.userRepository.save(user);
    }

    async updateRole(id: number, role: UserRole): Promise<User> {
        const user = await this.findById(id);
        user.role = role;
        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        const user = await this.findById(id);
        await this.userRepository.remove(user);
    }

    async verifyEmail(id: number): Promise<User> {
        const user = await this.findById(id);
        user.emailVerified = true;
        return await this.userRepository.save(user);
    }

    async findActiveUsers(): Promise<User[]> {
        return await this.userRepository.find({
            where: { status: UserStatus.ACTIVE },
            select: ['id', 'email', 'firstName', 'lastName', 'role', 'avatar', 'createdAt'],
        });
    }

    async findUsersByRole(role: UserRole): Promise<User[]> {
        return await this.userRepository.find({
            where: { role },
            select: ['id', 'email', 'firstName', 'lastName', 'status', 'avatar', 'createdAt'],
        });
    }

    async countUsers(): Promise<number> {
        return await this.userRepository.count();
    }

    async isEmailAvailable(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        return !user;
    }

    async findUserByEmail(email: string) {
        const findUser = await this.userRepository.findOne({
            where: { email },
        });

        return findUser
    }
} 
