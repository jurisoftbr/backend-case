import { UniqueId } from '@/core/entities/unique-id';
import { Document } from '@/domain/documents/entities/document';

interface DocumentObject {
  id: string;
  title: string;
  description: string;
  fileName: string;
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
    fileName,
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
        fileName,
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
      fileName: document.fileName,
      fileUrl: document.fileUrl,
      keywords: document.keywords,
      lawyerId: document.lawyerId.value,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
