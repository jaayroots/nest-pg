import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { ResProductDto, Product } from './dto/product.dto';

export function CreateProductDocs(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a new product' }),
    ApiExtraModels(ResProductDto, Product),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Validation error',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Product created successfully',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResProductDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(Product) },
            },
          },
        ],
      },
    }),
  );
}

export function GetProductDocs(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get product' }),
    ApiExtraModels(ResProductDto, Product),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Validation error',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Get product successfully',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResProductDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(Product) },
            },
          },
        ],
      },
    }),
  );
}

export function UpdateProductDocs(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update product' }),
    ApiExtraModels(ResProductDto, Product),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Validation error',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Update product successfully',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResProductDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(Product) },
            },
          },
        ],
      },
    }),
  );
}

export function DeleteProductDocs(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete product' }),
    ApiExtraModels(ResProductDto, Product),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Validation error',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Delete product successfully',
      schema: {
        allOf: [{ $ref: getSchemaPath(ResProductDto) }],
      },
    }),
  );
}
