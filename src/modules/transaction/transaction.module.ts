import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { UsersModule } from "../users/users.module";
import { Transaction } from "~/entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction]),
        UsersModule
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: []
})
export class TransactionModule { }