import { UniqueId } from '@/core/entities/unique-id';
import { Entity } from '@/core/entities/entity';

export interface DocumentProps {
  title: string;
  description: string;
  fileUrl: string;
  keywords: string[];
  lawyerId: UniqueId;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Document extends Entity<DocumentProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get fileUrl() {
    return this.props.fileUrl;
  }

  get keywords() {
    return this.props.keywords;
  }

  get lawyerId() {
    return this.props.lawyerId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: DocumentProps, id?: UniqueId) {
    return new Document(props, id);
  }
}
