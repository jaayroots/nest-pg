import { Injectable } from '@nestjs/common';
import { ReqProductDto } from './dto/product.dto';
import { Product } from '@prisma/client';
import { ProductRepository } from './product.repository';
import { NotFoundProduct } from './product.exception';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async createProduct(dto: ReqProductDto, userId: string): Promise<Product> {
    return await this.productRepo.createProduct(dto, userId);
  }

  async findByProductId(id: string): Promise<Product | null> {
    return await this.productRepo.findByProductId(id);
  }

  async updateProduct(
    id: string,
    dto: ReqProductDto,
    userId: string,
  ): Promise<Product | null> {
    const product = await this.productRepo.findByProductId(id);
    if (!product) {
      throw new NotFoundProduct();
    }
    return await this.productRepo.updateProduct(id, dto, userId);
  }

  async deleteProduct(id: string, userId: string): Promise<Product | null> {
    const product = await this.productRepo.findByProductId(id);
    if (!product) {
      throw new NotFoundProduct();
    }
    return await this.productRepo.deleteProduct(id, userId);
  }
}
