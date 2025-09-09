import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";


import { CategoryTemplateService } from "./categoryTemplate.service";
import { CategoryTemplateController } from "./categoryTemplate.controller";

import { CategoryModule } from "~/modules/categories/category.module";

import { CategoryTemplate } from "~/entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryTemplate]),
        CategoryModule,
    ],
    controllers: [CategoryTemplateController],
    providers: [CategoryTemplateService],
    exports: [CategoryTemplateService],
})
export class CategoryTemplateModule { }