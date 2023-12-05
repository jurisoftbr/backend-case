import { DocumentHistory } from '../entities/document-history';

export abstract class DocumentHistoriesRepository {
  abstract create(modificationHistory: DocumentHistory): Promise<void>;
  abstract findByDocument(documentId: string): Promise<DocumentHistory[]>;
}
