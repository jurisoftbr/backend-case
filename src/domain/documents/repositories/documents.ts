import { Document } from '../entities/document';

export abstract class DocumentsRepository {
  abstract findByLawyerId(lawyerId: string): Promise<Document[]>;
  abstract findById(id: string): Promise<Document | null>;
  abstract create(document: Document): Promise<Document>;
  abstract update(document: Document): Promise<Document>;
  abstract updateFile(
    id: string,
    fileName: string,
    fileUrl: string,
    currentVersion: number
  ): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
