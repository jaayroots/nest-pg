import {
  ValidateNested,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../dto/pagination.dto';

export class ProductFilterDto {
  @ApiPropertyOptional({ description: 'Search product by name (contains)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Minimum product price' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceMin?: number;

  @ApiPropertyOptional({ description: 'Maximum product price' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceMax?: number;
}

export class ProductPaginateDto extends PaginationDto {
  @ApiPropertyOptional({
    type: ProductFilterDto,
    description: 'Filter conditions',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProductFilterDto)
  filter?: ProductFilterDto;

  @ApiPropertyOptional({
    description: 'Locale of the translation to return',
    example: 'en',
  })
  @IsOptional()
  locale?: string;
}
