import { Document } from '../entities/document';

export abstract class DocumentsRepository {
  abstract findByLawyerId(lawyerId: string): Promise<Document[]>;
  abstract findById(id: string): Promise<Document | null>;
  abstract create(document: Document): Promise<void>;
  abstract update(document: Document): Promise<void>;
}
