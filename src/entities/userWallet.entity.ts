import { User } from '~/entities/user.entity';
import { Wallet } from '~/entities/wallet.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import type { User as UserType } from '~/entities';

@Entity('user_wallet')
export class UserWallet {
    @Exclude()
    @PrimaryColumn({
        name: "user_id",
        type: 'int'
    })
    userId: number;

    @Exclude()
    @PrimaryColumn({
        name: "wallet_id",
        type: 'int'
    })
    walletId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.userWallets)
    @JoinColumn({ name: 'user_id' })
    user: UserType;

    @ManyToOne(() => Wallet, (wallet) => wallet.userWallets)
    @JoinColumn({ name: 'wallet_id' })
    wallet: Wallet;
}