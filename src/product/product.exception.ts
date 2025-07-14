import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundProduct extends HttpException {
  constructor(message = 'Not found product') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
