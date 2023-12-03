import { Lawyer } from '../entities/auth-lawyer';

export abstract class AuthLawyersRepository {
  abstract create(lawyer: Lawyer): Promise<void>;
  abstract findByEmail(email: string): Promise<Lawyer | null>;
}
