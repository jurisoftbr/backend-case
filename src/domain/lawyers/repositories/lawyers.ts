import { Lawyer } from '../entities/lawyer';

export abstract class LawyersRepository {
  abstract findById(id: string): Promise<Lawyer | null>;
}
