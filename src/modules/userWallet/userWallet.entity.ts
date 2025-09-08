import { User } from '~/modules/users/user.entity';
import { Wallet } from '~/modules/wallets/wallet.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('user_wallet')
export class UserWallet {
    @PrimaryColumn({
        name: "user_id",
        type: 'int'
    })
    userId: number;

    @PrimaryColumn({
        name: "wallet_id",
        type: 'int'
    })
    walletId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.userWallets)
    @JoinColumn({ name: 'user_id' })
    user: User[];

    @ManyToOne(() => Wallet, (wallet) => wallet.userWallets)
    @JoinColumn({ name: 'wallet_id' })
    wallet: Wallet;
}