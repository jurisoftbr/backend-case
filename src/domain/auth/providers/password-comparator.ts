export interface PasswordComparatorProvider {
  execute(
    passwordHash: string,
    realPassword: string
  ): boolean | Promise<boolean>;
}
