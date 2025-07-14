import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { ReqProductDto } from './dto/product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(dto: ReqProductDto, userId: string): Promise<Product> {
    const name =
      dto.translations.find((e) => e.locale === 'en')?.name ??
      dto.translations[0].name;

    const slug = name
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/(^_+|_+$)/g, '')
      .toUpperCase();

    return await this.prisma.product.create({
      data: {
        slug: slug,
        price: dto.price,
        createdBy: userId,
        updatedBy: userId,
        translations: {
          create: dto.translations.map((t) => ({
            locale: t.locale,
            name: t.name,
            description: t.description,
            createdBy: userId,
            updatedBy: userId,
          })),
        },
      },
      include: {
        translations: true,
      },
    });
  }

  async findByProductId(id: string): Promise<Product | null> {
    return await this.prisma.product.findFirst({
      where: { id },
      include: {
        translations: true,
      },
    });
  }

  async updateProduct(
    id: string,
    dto: ReqProductDto,
    userId: string,
  ): Promise<Product> {
    const slug =
      dto.translations.find((t) => t.locale === 'en')?.name ??
      dto.translations[0].name;

    return await this.prisma.product.update({
      where: { id },
      data: {
        slug,
        price: dto.price,
        updatedBy: userId,
        updatedAt: new Date(),
        translations: {
          deleteMany: {},
          create: dto.translations.map((t) => ({
            locale: t.locale,
            name: t.name,
            description: t.description,
            createdBy: userId,
            updatedBy: userId,
          })),
        },
      },
      include: {
        translations: true,
      },
    });
  }

  async deleteProduct(id: string, userId: string): Promise<Product> {
    const now = new Date();

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        deletedAt: now,
        deletedBy: userId,
      },
    });

    await this.prisma.productTranslation.updateMany({
      where: {
        productId: id,
      },
      data: {
        deletedAt: now,
        deletedBy: userId,
      },
    });

    return product;
  }
}
