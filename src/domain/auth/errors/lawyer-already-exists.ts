import { UnauthorizedError } from '@/core/errors/unauthorized';

export class LawyerAlreadyExistsError extends UnauthorizedError {
  constructor(email: string) {
    super(`A lawyer with email ${email} already exists`);
  }
}
