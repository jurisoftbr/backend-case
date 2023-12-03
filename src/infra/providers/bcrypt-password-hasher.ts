import { PasswordHasherProvider } from '@/domain/auth/providers/password-hasher';
import * as bcrypt from 'bcryptjs';

export class BcryptPasswordHasherProvider implements PasswordHasherProvider {
  async execute(password: string): Promise<string> {
    const rounds = 12;
    const salt = await bcrypt.genSalt(rounds);

    return bcrypt.hash(password, salt);
  }
}
