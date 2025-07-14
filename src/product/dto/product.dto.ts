import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ResProductDto<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;
}

class TranslationDto {
  @ApiProperty({ example: 'en', description: 'Locale code (e.g., en, th)' })
  @IsString()
  locale: string;

  @ApiProperty({ example: 'iPhone 15', description: 'Product name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Latest Apple iPhone',
    description: 'Product description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
export class ReqProductDto {
  @ApiProperty({ example: 39900, description: 'Product price' })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: [TranslationDto],
    description: 'List of product translations by locale',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  translations: TranslationDto[];
}

export class Product {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedBy: string;

  @ApiProperty({ type: [TranslationDto] })
  translations: TranslationDto[];
}
