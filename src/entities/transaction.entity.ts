import {
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    Entity,
    UpdateDateColumn
} from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    wallet_id: number;

    @Column({ type: "decimal", precision: 15, scale: 2 })
    amount: number;

    @Column({ type: "text", nullable: true })
    note: string;

    @Column({ type: "int" })
    category_id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: "int" })
    user_id: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async checkWalletByUser() {
        if (this.user_id) {

        }
    }
}