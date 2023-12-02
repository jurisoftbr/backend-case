export interface PasswordComparatorProvider {
  execute(passwordHash: string, password: string): boolean;
}
