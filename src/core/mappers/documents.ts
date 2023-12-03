import { UniqueId } from '@/core/entities/unique-id';
import { Document } from '@/domain/documents/entities/document';

interface DocumentObject {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  keywords: string[];
  lawyerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class DocumentsMapper {
  static toDomain({
    id,
    title,
    description,
    fileUrl,
    keywords,
    lawyerId,
    createdAt,
    updatedAt,
  }: DocumentObject): Document {
    return Document.create(
      {
        title,
        description,
        fileUrl,
        keywords,
        lawyerId: new UniqueId(lawyerId),
        createdAt,
        updatedAt,
      },
      new UniqueId(id)
    );
  }

  static toObject(document: Document): DocumentObject {
    return {
      id: document.id.value,
      title: document.title,
      description: document.description,
      fileUrl: document.fileUrl,
      keywords: document.keywords,
      lawyerId: document.lawyerId.value,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
