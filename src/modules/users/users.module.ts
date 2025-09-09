import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { WalletModule } from '~/modules/wallets/wallet.module';
import { UserWalletModule } from '~/modules/userWallet/userWallet.module';
import { CategoryTemplateModule } from '~/modules/categoryTemplate/categoryTemplate.module';

import { User } from '~/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    WalletModule,
    UserWalletModule,
    CategoryTemplateModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { } 
