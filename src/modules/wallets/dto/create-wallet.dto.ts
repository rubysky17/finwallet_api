import { IsString, IsEnum, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { WalletType } from '../../../entities/wallet.entity';

export class CreateWalletDto {
    @IsString()
    name: string;

    @IsEnum(WalletType)
    type: WalletType;

    @IsString()
    @IsOptional()
    currencyFormat?: string;

    @IsNumber()
    @IsOptional()
    currentBalance?: number;

    @IsBoolean()
    @IsOptional()
    enabled?: boolean;

    @IsBoolean()
    @IsOptional()
    allowNotifications?: boolean;

    @IsNumber()
    userId: number
} 