import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { CreateWalletDto } from './dto';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) { }

    async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
        const wallet = this.walletRepository.create(createWalletDto);

        return await this.walletRepository.save(wallet);
    }

    async findAll(userId: number): Promise<Wallet[]> {
        return await this.walletRepository.find({
            where: { userId, archived: false },
            order: { createdAt: 'DESC' },
        });
    }

    async findOneById(id: number): Promise<Wallet> {
        const wallet = await this.walletRepository.findOne({
            where: { id },
        });

        if (!wallet) {
            throw new NotFoundException(`Wallet with ID ${id} not found`);
        }

        return wallet;
    }

    async findOneByUserId(userId: number): Promise<Wallet> {
        const wallet = await this.walletRepository.findOne({
            where: { userId },
        });

        if (!wallet) {
            throw new NotFoundException(`Wallet with UserId ${userId} not found`);
        }

        return wallet;
    }

    // async update(id: number, updateWalletDto: UpdateWalletDto, userId: number): Promise<Wallet> {
    //     const wallet = await this.findOne(id, userId);

    //     Object.assign(wallet, updateWalletDto);
    //     return await this.walletRepository.save(wallet);
    // }

    // async remove(id: number, userId: number): Promise<void> {
    //     const wallet = await this.findOne(id, userId);
    //     await this.walletRepository.remove(wallet);
    // }

    // async archive(id: number, userId: number): Promise<Wallet> {
    //     const wallet = await this.findOne(id, userId);
    //     wallet.archived = true;
    //     return await this.walletRepository.save(wallet);
    // }

    // async updateBalance(id: number, amount: number, userId: number): Promise<Wallet> {
    //     const wallet = await this.findOne(id, userId);
    //     wallet.currentBalance += amount;
    //     return await this.walletRepository.save(wallet);
    // }

    async getWalletStats(userId: number): Promise<any> {
        const wallets = await this.findAll(userId);
        const totalBalance = wallets.reduce((sum, wallet) => sum + Number(wallet.currentBalance), 0);

        return {
            totalWallets: wallets.length,
            totalBalance,
            activeWallets: wallets.filter(w => w.enabled).length,
            archivedWallets: wallets.filter(w => w.archived).length,
        };
    }
} 