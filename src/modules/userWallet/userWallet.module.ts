import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserWallet } from "./userWallet.entity";
import { UserWalletService } from "./userWallet.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserWallet])
    ],
    controllers: [],
    providers: [UserWalletService],
    exports: [UserWalletService]
})
export class UserWalletModule { }