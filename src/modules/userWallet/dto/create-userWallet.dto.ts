import { IsNumber } from "class-validator"

export class CreateUserWalletDto {
    @IsNumber()
    userId: number

    @IsNumber()
    walletId: number
}