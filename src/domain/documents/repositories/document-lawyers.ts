import { Lawyer } from '../entities/lawyer';

export abstract class DocumentLawyersRepository {
  abstract findById(id: string): Promise<Lawyer | null>;
}
