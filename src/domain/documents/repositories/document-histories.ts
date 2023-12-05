import { DocumentHistory } from '../entities/document-history';

export abstract class DocumentHistoriesRepository {
  abstract create(documentHistory: DocumentHistory): Promise<void>;
  abstract findByDocumentId(documentId: string): Promise<DocumentHistory[]>;
}
