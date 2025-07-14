import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TokenRepository {
  constructor(private prisma: PrismaService) {}

  async createToken(userId: string, token: string, expiresAt: Date) {
    return await this.prisma.token.create({
      data: { userId, token, expiresAt },
    });
  }

  async removeToken(token: string) {
    return await this.prisma.token.delete({ where: { token } });
  }

  async findToken(token: string) {
    return await this.prisma.token.findUnique({ where: { token } });
  }

  async deleteTokensByUserId(userId: string): Promise<void> {
    await await this.prisma.token.deleteMany({
      where: { userId },
    });
  }
}
