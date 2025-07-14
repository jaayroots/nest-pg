import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { ReqProductDto } from './dto/product.dto';
import {
  ProductFilterDto,
  ProductPaginateDto,
} from './dto/product-paginate.dto';

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
  async paginate(dto: ProductPaginateDto) {
    const where = this.buildWhere(dto);
    const { page = 1, limit = 10 } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: this.buildOrderBy(dto),
        include: {
          translations: {
            where: {
              locale: dto.locale || 'en',
            },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private buildWhere(dto: ProductPaginateDto): Prisma.ProductWhereInput {
    const conditions: Prisma.ProductWhereInput[] = [];

    conditions.push({ deletedAt: null });

    const nameFilter = this.filterName(dto.filter, dto.locale);
    if (nameFilter) conditions.push(nameFilter);

    const priceFilter = this.filterPrice(dto.filter);
    if (priceFilter) conditions.push(priceFilter);

    return conditions.length > 1 ? { AND: conditions } : conditions[0];
  }

  private filterName(
    filter?: ProductFilterDto,
    locale = 'en',
  ): Prisma.ProductWhereInput | undefined {
    if (!filter?.name) return;

    return {
      translations: {
        some: {
          locale,
          name: {
            contains: filter.name,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      },
    };
  }

  private filterPrice(
    filter?: ProductFilterDto,
  ): Prisma.ProductWhereInput | undefined {
    if (!filter) return;

    const priceConditions: Prisma.FloatFilter = {};

    if (filter.priceMin !== undefined) {
      priceConditions.gte = filter.priceMin;
    }

    if (filter.priceMax !== undefined) {
      priceConditions.lte = filter.priceMax;
    }

    if (Object.keys(priceConditions).length > 0) {
      return { price: priceConditions };
    }

    return;
  }

  private buildOrderBy(
    dto: ProductPaginateDto,
  ): Prisma.ProductOrderByWithRelationInput {
    const sortBy = dto.sortBy || 'createdAt';
    const order = dto.order || 'desc';

    return { [sortBy]: order };
  }
}
