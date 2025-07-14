import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExistsException extends HttpException {
  constructor(message = 'Email already exists') {
    super(message, HttpStatus.CONFLICT);
  }
}

export class CreateFailedException extends HttpException {
  constructor(message = 'Failed to create resource') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'Resource not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
