import { BadRequestError } from './bad-request';

export class ValidationError extends BadRequestError {
  constructor(key: string) {
    super(`Invalid ${key} provided`);
  }
}
