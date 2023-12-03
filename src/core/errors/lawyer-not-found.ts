export class LawyerNotFoundError extends Error {
  constructor(lawyerId: string) {
    super(`Lawyer with id ${lawyerId} was not found`);
  }
}
