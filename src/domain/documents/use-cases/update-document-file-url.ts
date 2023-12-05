import { inject, injectable } from 'tsyringe';
import { DocumentNotFoundError } from '../errors/document-not-found';
import { DocumentsRepository } from '../repositories/documents';
import { DocumentHistoriesRepository } from '../repositories/document-histories';
import { Document } from '../entities/document';
import { DocumentHistory } from '../entities/document-history';
import { DocumentHistoryDescription } from '../entities/value-objects/document-history-description';

interface UpdateDocumentFileUrlUseCaseRequest {
  documentId: string;
  fileName: string;
}

interface UpdateDocumentFileUrlUseCaseResponse {
  fileUrl: string;
}

@injectable()
export class UpdateDocumentFileUrlUseCase {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: DocumentsRepository,
    @inject('DocumentHistoriesRepository')
    private documentHistoriesRepository: DocumentHistoriesRepository
  ) {}

  async execute({
    documentId,
    fileName,
  }: UpdateDocumentFileUrlUseCaseRequest): Promise<UpdateDocumentFileUrlUseCaseResponse> {
    const document = await this.findDocument(documentId);

    const fileUrl = `http://localhost:3333/documents/${documentId}/${fileName}`;

    await this.documentsRepository.updateFile(
      documentId,
      fileName,
      fileUrl,
      document.version
    );
    await this.createDocumentUpdateHistory(document);

    return { fileUrl };
  }

  private async findDocument(documentId: string): Promise<Document> {
    const document = await this.documentsRepository.findById(documentId);

    if (!document) throw new DocumentNotFoundError(documentId);

    return document;
  }

  private async createDocumentUpdateHistory(document: Document) {
    const documentHistory = DocumentHistory.create({
      description: DocumentHistoryDescription.createFromType({
        type: 'updateFile',
        document,
      }),
      type: 'updateFile',
      documentId: document.id,
    });

    return this.documentHistoriesRepository.create(documentHistory);
  }
}
