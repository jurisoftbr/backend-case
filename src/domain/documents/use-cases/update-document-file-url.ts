import { inject, injectable } from 'tsyringe';
import { DocumentNotFoundError } from '../errors/document-not-found';
import { DocumentsRepository } from '../repositories/documents';

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
    private documentsRepository: DocumentsRepository
  ) {}

  async execute({
    documentId,
    fileName,
  }: UpdateDocumentFileUrlUseCaseRequest): Promise<UpdateDocumentFileUrlUseCaseResponse> {
    await this.checkDocumentExistence(documentId);

    const fileUrl = `http://localhost:3333/documents/${documentId}/${fileName}`;

    await this.documentsRepository.updateFileUrl(documentId, fileUrl);

    return { fileUrl };
  }

  private async checkDocumentExistence(documentId): Promise<void> {
    const document = await this.documentsRepository.findById(documentId);

    if (!document) throw new DocumentNotFoundError(documentId);
  }
}
