import { Module } from "@nestjs/common";
import { Wallet } from "./wallet.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Wallet]),
    ],
    controllers: [WalletController],
    providers: [WalletService],
    exports: [WalletService]
})
export class WalletModule { } 