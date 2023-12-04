import { UnauthorizedError } from '@/core/errors/unauthorized';

export class InvalidTokenError extends UnauthorizedError {
  constructor() {
    super('The token provided is expired');
  }
}
