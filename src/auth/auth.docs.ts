import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiRegisterDocs(): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    applyDecorators(
      ApiOperation({ summary: 'Register a new user' }),
      ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User successfully registered',
      }),
      ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Validation error',
      }),
      ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Email already exists',
      }),
    )(target, propertyKey, descriptor);
  };
}

export function ApiLoginDocs(): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    applyDecorators(
      ApiOperation({ summary: 'Login a user' }),
      ApiResponse({ status: 200, description: 'User successfully logged in' }),
      ApiResponse({ status: 401, description: 'Invalid credentials' }),
    )(target, propertyKey, descriptor);
  };
}
