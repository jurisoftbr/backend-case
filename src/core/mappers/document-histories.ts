import {
  DocumentHistory,
  DocumentHistoryType,
} from '@/domain/documents/entities/document-history';
import { UniqueId } from '../entities/unique-id';
import { DocumentHistoryDescription } from '@/domain/documents/entities/value-objects/document-history-description';

interface DocumentHistoryObject {
  id: string;
  description: string;
  type: DocumentHistoryType;
  documentId: string;
  createdAt: Date;
}

export class DocumentHistoriesMapper {
  static toDomain({
    id,
    description,
    type,
    documentId,
    createdAt,
  }: DocumentHistoryObject): DocumentHistory {
    return DocumentHistory.create(
      {
        description: new DocumentHistoryDescription({ text: description }),
        type,
        documentId: new UniqueId(documentId),
        createdAt,
      },
      new UniqueId(id)
    );
  }

  static toObject(documentHistory: DocumentHistory): DocumentHistoryObject {
    return {
      id: documentHistory.id.value,
      description: documentHistory.description.text,
      type: documentHistory.type,
      documentId: documentHistory.documentId.value,
      createdAt: documentHistory.createdAt,
    };
  }
}
