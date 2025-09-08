import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dto/transaction.dto";
import { AuthGuard } from "@nestjs/passport";
import { Token } from "../auth/decorators/user.decorator";

@ApiTags("Giao dịch")
@UseGuards(AuthGuard('jwt'))
@Controller("transaction")
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService
    ) { }

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto, @Token() token) {
        return this.transactionService.create(createTransactionDto, token);
    }
}