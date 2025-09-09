import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";

import { CategoryTemplate, UserWallet } from ".";

export enum WalletType {
    BASIC = "basic",
    LINKED = "linked",
    GOAL = "goal",
    CREDIT = "credit",
    OTHER = "other"
}

@Entity("wallets")
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({
        type: 'enum',
        enum: WalletType,
        default: WalletType.BASIC,
    })
    type: WalletType;

    @Column({ name: 'user_id', select: false })
    userId: number;

    @Column({ length: 10, default: 'VND' })
    currencyFormat: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    currentBalance: number;

    @Column({ default: true })
    enabled: boolean;

    @Column({ default: true })
    allowNotifications: boolean;

    @Column({ default: false })
    archived: boolean;

    @OneToMany(() => CategoryTemplate, (categoryTemplate) => categoryTemplate.user)
    categoryTemplates: CategoryTemplate[];

    @OneToMany(() => UserWallet, (userWallet) => userWallet.wallet)
    userWallets: UserWallet[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}