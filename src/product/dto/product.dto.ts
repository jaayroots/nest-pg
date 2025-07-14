import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ResProductDto<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;
}

export class ReqProductDto {
  @ApiProperty({ example: 'iPhone 15', description: 'Product name' })
  @IsNotEmpty()
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

  @ApiProperty({ example: 39900, description: 'Product price' })
  @IsNumber()
  price: number;
}

export class Product {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

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
}
