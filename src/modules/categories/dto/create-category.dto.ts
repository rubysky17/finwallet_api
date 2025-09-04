import { IsEnum, IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { CategoryType } from '../category.entity';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsEnum(CategoryType)
    type?: CategoryType;

    @IsOptional()
    @IsNumber()
    parentId?: number | null;
}
