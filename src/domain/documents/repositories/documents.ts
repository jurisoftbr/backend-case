import { Document } from '../entities/document';

export abstract class DocumentsRepository {
  abstract findByLawyerId(lawyerId: string): Promise<Document[]>;
}
