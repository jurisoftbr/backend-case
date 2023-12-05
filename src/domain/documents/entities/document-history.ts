import { Entity } from '@/core/entities/entity';
import { DocumentHistoryDescription } from './value-objects/document-history-description';
import { UniqueId } from '@/core/entities/unique-id';

export type DocumentHistoryType = 'create' | 'update' | 'updateFile';

export interface DocumentHistoryProps {
  description: DocumentHistoryDescription;
  type: DocumentHistoryType;
  documentId: UniqueId;
  createdAt?: Date;
}

export class DocumentHistory extends Entity<DocumentHistoryProps> {
  get description() {
    return this.props.description;
  }

  get type() {
    return this.props.type;
  }

  get documentId() {
    return this.props.documentId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: DocumentHistoryProps, id?: UniqueId) {
    return new DocumentHistory(props, id);
  }
}
