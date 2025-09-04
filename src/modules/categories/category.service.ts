import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

// Entities
import { Category } from "./category.entity";

// DTOs
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    async create(createCategory: CreateCategoryDto): Promise<Category> {
        const category = await this.categoryRepository.create(createCategory);
        return this.categoryRepository.save(category);
    }

    async update(id: number, updateCategory: UpdateCategoryDto): Promise<Category> {
        const category = await this.findById(id);
        const merged = await this.categoryRepository.merge(category, updateCategory);
        return await this.categoryRepository.save(merged);
    }

    async findAllWithSeed(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find({
            where: { parentId: IsNull() },
            relations: ['children', 'children.children'],
        });
    }

    async findById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: { id },
            select: ['id', "name", "isActive", "type", "parentId"],
        });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }

    async removeById(id: number): Promise<void> {
        const user = await this.findById(id);
        await this.categoryRepository.remove(user);
    }
}