import { Injectable } from "@nestjs/common";
import { CreateUserWalletDto } from "./dto/create-userWallet.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserWallet } from "./userWallet.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserWalletService {
    constructor(
        @InjectRepository(UserWallet)
        private readonly userWalletRepository: Repository<UserWallet>,
    ) { }

    async create(payload: CreateUserWalletDto): Promise<any> {
        const userWallet = await this.userWalletRepository.create(payload);
        return await this.userWalletRepository.save(userWallet)
    }

    async getWalletWithUsers(userId: number) {
        const walletWithUsers = await this.userWalletRepository.findOne({
            where: { userId },
            relations: ['wallet'],
        });

        return walletWithUsers?.wallet || null
    }

    async getWalletByUserId(userId: number) {
        const walletWithUsers = await this.userWalletRepository.find({
            where: { userId },
            relations: ['wallet'],
        });

        return walletWithUsers.map((uw) => uw.wallet);
    }

    async getUsersWithWallet(walletId: number) {
        const usersWithWallet = await this.userWalletRepository.findOne({
            where: { walletId },
            relations: ['user'],
        });

        return usersWithWallet
    }


}