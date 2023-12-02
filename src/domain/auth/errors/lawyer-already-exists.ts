export class LawyerAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`A lawyer with email ${email} already exists`);
  }
}
