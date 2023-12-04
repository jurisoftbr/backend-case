import { NotFoundError } from './not-found';

export class LawyerNotFoundError extends NotFoundError {
  constructor(lawyerId: string) {
    super(`Lawyer with id ${lawyerId} was not found`);
  }
}
