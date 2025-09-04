import { IsEnum, IsOptional, IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';
import { CategoryType } from '../category.entity';

export class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    @IsEnum(CategoryType)
    type?: CategoryType;

    @IsOptional()
    @IsNumber()
    parentId?: number | null;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
