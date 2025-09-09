import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum CategoryType {
    EXPENSE = 'expense',
    INCOME = 'income',
    OTHER = 'other',
}

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({
        type: 'enum',
        enum: CategoryType,
        default: CategoryType.INCOME,
    })
    type: CategoryType;

    @Column({ name: 'parent_id', nullable: true, default: null })
    parentId?: number | null;

    @ManyToOne(() => Category, (category) => category.children, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'parent_id' })
    parent?: Category;

    @OneToMany(() => Category, (category) => category.parent)
    children?: Category[];

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
