import { DocumentHistory } from '../entities/document-history';
import { DocumentsRepository } from '../repositories/documents';
import { DocumentHistoriesRepository } from '../repositories/document-histories';
import { DocumentNotFoundError } from '../errors/document-not-found';
import { inject, injectable } from 'tsyringe';

interface FetchDocumentHistoryUseCaseRequest {
  documentId: string;
}

interface FetchDocumentHistoryUseCaseResponse {
  documentHistory: DocumentHistory[];
}

@injectable()
export class FetchDocumentHistoryUseCase {
  constructor(
    @inject('DocumentHistoriesRepository')
    private documentHistoryRepository: DocumentHistoriesRepository,
    @inject('DocumentsRepository')
    private documentsRepository: DocumentsRepository
  ) {}

  async execute({
    documentId,
  }: FetchDocumentHistoryUseCaseRequest): Promise<FetchDocumentHistoryUseCaseResponse> {
    await this.checkDocumentExistence(documentId);

    const documentHistory =
      await this.documentHistoryRepository.findByDocumentId(documentId);

    return { documentHistory };
  }

  private async checkDocumentExistence(documentId: string) {
    const document = await this.documentsRepository.findById(documentId);

    if (!document) throw new DocumentNotFoundError(documentId);
  }
}
