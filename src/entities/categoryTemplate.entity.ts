import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { CategoryType, Category, User } from '.';
import type { User as UserType } from './user.entity';

@Entity('category_template')
export class CategoryTemplate {
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

    @Column({ nullable: false })
    rootId?: number;

    @ManyToOne(() => Category, (category) => category.children, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'parent_id' })
    parent?: Category;

    @Column({ default: true })
    isActive: boolean;

    @Column({ name: 'user_id' })
    @Exclude()
    userId: number | string;

    @ManyToOne(() => User, user => user.categoryTemplates)
    @JoinColumn({ name: 'user_id' })
    user: UserType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
