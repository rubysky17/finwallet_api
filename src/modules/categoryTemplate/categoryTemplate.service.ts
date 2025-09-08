import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "~/modules/categories/category.service";
import { CategoryTemplate } from "./categoryTemplate.entity";
import { Repository } from "typeorm";
import { UpdateCategoryTemplateDto } from "./dto/update-categoryTemplate.dto";

@Injectable()
export class CategoryTemplateService {
    constructor(
        @InjectRepository(CategoryTemplate)
        private readonly categoryTemplateRepository: Repository<CategoryTemplate>,
        private readonly categoryService: CategoryService,
    ) { }

    async getDefault() {
        return await this.categoryService.findAllWithSeed();
    }

    async getAll() {
        return await this.categoryTemplateRepository.find({
            select: ['id', "user", "userId", "name", "type", 'parentId', 'rootId', 'isActive']
        });
    }

    async createByUserId(userId: number | string) {
        // Get default with all seed of category list
        const defaultCategories = await this.getDefault();

        if (!defaultCategories || defaultCategories.length === 0) {
            throw new Error("No default categories found");
        } else {
            // If list have item will loop and auto create template by userId
            defaultCategories.forEach(async (category) => {
                const payload = {
                    name: category.name,
                    type: category.type,
                    parentId: category.parentId,
                    rootId: category.id,
                    userId,
                    isActive: true
                }

                const catelogyCreated = await this.categoryTemplateRepository.create(payload);
                await this.categoryTemplateRepository.save(catelogyCreated);
            });

            return {
                message: 'Categories created successfully',
            }
        }
    }

    async updateCategoryByUserId(body: UpdateCategoryTemplateDto) {
        return await this.categoryTemplateRepository.save(body.items);
    }
}