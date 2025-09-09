import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTransactionDto } from "./dto/transaction.dto";
import { UsersService } from "../users/users.service";

import { Transaction } from "~/entities";

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        private readonly usersService: UsersService,
    ) { }

    async create(transactionData: CreateTransactionDto, token) {
        const userId = token.id;
        const walletId = transactionData.wallet_id;

        // Lấy thông tin user từ token
        const userInfo = await this.usersService.findById(userId);

        // Ví thông tin giao dịch trùng với thông tin ví người dùng
        if (userInfo.walletList.some(wallet => wallet.id === walletId)) {
            const createTransactionDto = {
                ...transactionData,
                user_id: userInfo.id
            }
            const transaction = this.transactionRepository.create(createTransactionDto);
            return this.transactionRepository.save(transaction);
        } else {
            throw new ConflictException('Invalid wallet for this user');
        }
    }
}