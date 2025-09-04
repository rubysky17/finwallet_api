import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoryTemplate } from "./category-template.entity";
import { CategoryTemplateService } from "./category-template.service";
import { CategoryTemplateController } from "./category-template.controller";

import { CategoryModule } from "~/modules/categories/category.module";
import { UsersModule } from "~/modules/users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryTemplate]),
        CategoryModule,
        forwardRef(() => UsersModule)
    ],
    providers: [CategoryTemplateService],
    controllers: [CategoryTemplateController],
    exports: [CategoryTemplateService],
})
export class CategoryTemplateModule { }