export class InvalidTokenError extends Error {
  constructor() {
    super('The token provided is expired');
  }
}
