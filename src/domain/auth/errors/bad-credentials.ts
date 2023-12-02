export class BadCredentialsError extends Error {
  constructor() {
    super('The credentials provided are wrong');
  }
}
