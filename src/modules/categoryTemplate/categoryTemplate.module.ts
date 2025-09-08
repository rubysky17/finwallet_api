import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoryTemplate } from "./categoryTemplate.entity";

import { CategoryTemplateService } from "./categoryTemplate.service";
import { CategoryTemplateController } from "./categoryTemplate.controller";

import { CategoryModule } from "~/modules/categories/category.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryTemplate]),
        CategoryModule,
    ],
    providers: [CategoryTemplateService],
    controllers: [CategoryTemplateController],
    exports: [CategoryTemplateService],
})
export class CategoryTemplateModule { }