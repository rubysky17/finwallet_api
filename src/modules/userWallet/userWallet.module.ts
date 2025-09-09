import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserWalletService } from "./userWallet.service";

import { UserWallet } from "~/entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserWallet])
    ],
    controllers: [],
    providers: [UserWalletService],
    exports: [UserWalletService]
})
export class UserWalletModule { }