export interface PasswordComparatorProvider {
  execute(passwordHash: string, realPassword: string): Promise<boolean>;
}
