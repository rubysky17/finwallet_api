import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards
} from "@nestjs/common";
// import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { WalletService } from "./wallet.service";
import { CreateWalletDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Quản lý ví')
@Controller("wallets")
// @UseGuards(JwtAuthGuard)
export class WalletController {
    constructor(
        private readonly walletService: WalletService
    ) { }

    @Get(":id")
    async getWalletById(@Param('id') id: number) {
        const result = this.walletService.findOneById(id)

        return result
    }

    @Get("/users/:userId")
    async getWalletByUserId(@Param('userId') userId: number) {
        const result = this.walletService.findOneByUserId(userId)

        return result
    }

    @Post()
    async createWallet(@Body() createWalletDto: CreateWalletDto) {
        const result = this.walletService.create(createWalletDto)

        return result
    }
}