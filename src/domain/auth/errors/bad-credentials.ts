import { UnauthorizedError } from '@/core/errors/unauthorized';

export class BadCredentialsError extends UnauthorizedError {
  constructor() {
    super('The credentials provided are wrong');
  }
}
