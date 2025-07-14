import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpStatus,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ReqProductDto } from './dto/product.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateProductDocs,
  DeleteProductDocs,
  GetProductDocs,
  UpdateProductDocs,
} from './product.docs';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ResponseDto } from 'src/dto/response.dto';

@ApiTags('products')
@ApiBearerAuth('access-token')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @CreateProductDocs()
  async createProduct(
    @Body() dto: ReqProductDto,
    @GetUser('userId') userId: string,
  ): Promise<ResponseDto> {
    const product = await this.productService.createProduct(dto, userId);
    return new ResponseDto({
      status_code: HttpStatus.CREATED,
      message: 'Product created successfully',
      data: product,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @GetProductDocs()
  async findByProductId(@Param('id') id: string): Promise<ResponseDto> {
    const product = await this.productService.findByProductId(id);
    return new ResponseDto({
      status_code: HttpStatus.OK,
      data: product,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UpdateProductDocs()
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: ReqProductDto,
    @GetUser('userId') userId: string,
  ): Promise<ResponseDto> {
    const product = await this.productService.updateProduct(id, dto, userId);
    return new ResponseDto({
      status_code: HttpStatus.OK,
      message: 'Product updated successfully',
      data: product,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @DeleteProductDocs()
  async deleteProduct(
    @Param('id') id: string,
    @GetUser('userId') userId: string,
  ): Promise<ResponseDto> {
    await this.productService.deleteProduct(id, userId);
    return new ResponseDto({
      status_code: HttpStatus.OK,
      message: 'Product deleted successfully',
      data: null,
    });
  }
}
