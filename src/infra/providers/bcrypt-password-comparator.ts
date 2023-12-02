/* eslint-disable indent */
import { PasswordComparatorProvider } from '@/domain/auth/providers/password-comparator';
import * as bcrypt from 'bcryptjs';

export class BcryptPasswordComparatorProvider
  implements PasswordComparatorProvider
{
  async execute(passwordHash: string, realPassword: string) {
    return bcrypt.compare(passwordHash, realPassword);
  }
}
