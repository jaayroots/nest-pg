// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiRegisterDocs, ApiLoginDocs } from './auth.docs';
import { ResponseDto } from 'src/dto/response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiRegisterDocs()
  async register(@Body() dto: RegisterDto): Promise<ResponseDto<null>> {
    await this.authService.register(dto);

    return new ResponseDto({
      status_code: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: null,
    });
  }

  @Post('login')
  @ApiLoginDocs()
  async login(@Body() dto: LoginDto) {
    // คืนค่า token ตรงๆ ให้ client
    return this.authService.login(dto);
  }
}
