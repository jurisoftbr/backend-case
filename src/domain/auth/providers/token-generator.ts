export interface TokenGeneratorProvider {
  execute(id: string, role: string): string;
}
