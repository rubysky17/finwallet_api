import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

class CreateTransactionDto {
    @IsNumber()
    wallet_id: number;

    @IsNumber()
    @Min(0)
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    category_id: number;
}

export {
    CreateTransactionDto
}