import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthRepository } from './auth.repository';
import { AuthToken } from './interfaces/auth-token.interface';
import { UserExistsException } from './exceptions/auth.exception';
import { TokenRepository } from '../token/token.repository';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private readonly authRepo: AuthRepository,
    private readonly tokenRepo: TokenRepository,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.authRepo.findByEmail(dto.email);
    if (exists) {
      throw new UserExistsException();
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    await this.authRepo.createUser({
      email: dto.email,
      password: hashed,
      name: dto.name,
    });
    return;
  }

  async login(dto: LoginDto): Promise<AuthToken> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user.id, user.email);

    const expiresInStr = this.config.get<string>('JWT_EXPIRES_IN') || '60m';
    const expiresInMs = ms(expiresInStr);

    if (!expiresInMs || expiresInMs <= 0) {
      throw new Error('JWT_EXPIRES_IN must be a positive duration string');
    }

    const expiresAt = new Date(Date.now() + expiresInMs);

    await this.tokenRepo.deleteTokensByUserId(user.id);
    await this.tokenRepo.createToken(user.id, token.access_token, expiresAt);

    return token;
  }

  signToken(userId: string, email: string): AuthToken {
    const secret = this.config.get<string>('JWT_SECRET');
    const expiresIn = this.config.get<string>('JWT_EXPIRES_IN') || '60m';

    if (!secret) {
      throw new Error('JWT_SECRET not set in environment variables');
    }

    return {
      access_token: this.jwt.sign(
        { sub: userId, email },
        {
          secret,
          expiresIn,
        },
      ),
    };
  }
}
