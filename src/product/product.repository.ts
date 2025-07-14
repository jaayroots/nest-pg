import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { ReqProductDto } from './dto/product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(dto: ReqProductDto, userId: string): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        ...dto,
        createdBy: userId,
        updatedBy: userId,
      },
    });
  }

  async findByProductId(id: string): Promise<Product | null> {
    return await this.prisma.product.findFirst({
      where: { id },
    });
  }

  async updateProduct(
    id: string,
    dto: ReqProductDto,
    updatedBy: string,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...dto,
        updatedBy,
      },
    });
  }

  async deleteProduct(id: string, deletedBy: string): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
        deletedBy: deletedBy,
      },
    });
  }
}
