import { Lawyer } from '../entities/lawyer';

export abstract class LawyersRepository {
  abstract create(lawyer: Lawyer): Promise<void>;
  abstract findByEmail(email: string): Promise<Lawyer | null>;
}
