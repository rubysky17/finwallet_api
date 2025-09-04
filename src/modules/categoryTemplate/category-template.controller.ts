import { Body, Controller, Get, Put } from "@nestjs/common";
import { CategoryTemplateService } from "./category-template.service";
import { UpdateCategoryTemplateDto } from "./dto/update-categoryTemplate.dto";

@Controller("category-template")
export class CategoryTemplateController {
    constructor(
        private readonly categoryTemplateService: CategoryTemplateService
    ) { }

    @Get()
    async getDefault() {
        const result = await this.categoryTemplateService.getDefault();

        return {
            message: "Get categories list sucessfully",
            data: result
        }
    }

    @Get("/all")
    async getTemplates() {
        const result = await this.categoryTemplateService.getAll();

        return result
    }

    @Put()
    async update(
        @Body() updateCategory: UpdateCategoryTemplateDto,
    ) {
        const result = await this.categoryTemplateService.updateCategoryByUserId(updateCategory)

        return result
    }
}