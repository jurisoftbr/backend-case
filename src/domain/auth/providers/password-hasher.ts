export interface PasswordHasherProvider {
  execute(password: string): string | Promise<string>;
}
