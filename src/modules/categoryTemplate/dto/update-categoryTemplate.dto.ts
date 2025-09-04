import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, ValidateNested } from 'class-validator';


export class SingleCategoryTemplateDto {
    @IsNumber()
    id: number;

    @IsBoolean()
    isActive: boolean;
}

export class UpdateCategoryTemplateDto {
    @ValidateNested({ each: true })
    @Type(() => SingleCategoryTemplateDto)
    items: SingleCategoryTemplateDto[];
}
