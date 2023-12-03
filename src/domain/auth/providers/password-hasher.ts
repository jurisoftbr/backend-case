export interface PasswordHasherProvider {
  execute(password: string): Promise<string>;
}
