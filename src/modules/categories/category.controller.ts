import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards
} from "@nestjs/common";

// DTOs
import { UpdateCategoryDto, CreateCategoryDto } from "./dto";
// Services
import { CategoryService } from "./category.service";
// Guards
import { JwtAuthGuard } from "~/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "~/modules/auth/guards/roles.guard";
import { UserRole } from "~/modules/users/user.entity";
import { Roles } from "~/modules/auth/decorators/roles.decorator";
import { Public } from "~/modules/auth/decorators/public.decorator";

@Controller("categories")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Get()
    async getAllCategories() {
        const list = await this.categoryService.findAll();

        return {
            message: 'Categories retrieved successfully',
            data: list,
        }
    }

    @Public()
    @Get("/seed")
    async getAllCategoriesWithSeed() {
        const list = await this.categoryService.findAllWithSeed()

        return {
            message: 'Categories retrieved successfully',
            data: list,
        }
    }

    @Post()
    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    async create(@Body() createCategory: CreateCategoryDto) {
        const user = await this.categoryService.create(createCategory);

        return {
            message: 'User created successfully',
            data: user,
        };
    }

    @Put(":id")
    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    async update(
        @Body() updateCategory: UpdateCategoryDto,
        @Param('id') id: number
    ) {
        const result = await this.categoryService.update(id, updateCategory);

        return {
            message: 'Category updated successfully',
            data: result,
        };
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: number
    ) {
        await this.categoryService.removeById(id);

        return {
            message: 'Category deleted successfully',
        };
    }
}