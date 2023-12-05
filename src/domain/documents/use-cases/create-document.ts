import { UniqueId } from '@/core/entities/unique-id';
import { Document } from '../entities/document';
import { DocumentsRepository } from '../repositories/documents';
import { DocumentLawyersRepository } from '../repositories/document-lawyers';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { inject, injectable } from 'tsyringe';
import { DocumentHistoriesRepository } from '../repositories/document-histories';
import { DocumentHistory } from '../entities/document-history';
import { DocumentHistoryDescription } from '../entities/value-objects/document-history-description';

interface CreateDocumentUseCaseRequest {
  title: string;
  description: string;
  keywords: string[];
  lawyerId: string;
  categoryId: string;
}

interface CreateDocumentUseCaseResponse {
  document: Document;
}

@injectable()
export class CreateDocumentUseCase {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: DocumentsRepository,
    @inject('DocumentLawyersRepository')
    private lawyersRepository: DocumentLawyersRepository,
    @inject('DocumentHistoriesRepository')
    private documentHistoriesRepository: DocumentHistoriesRepository
  ) {}

  async execute({
    title,
    description,
    keywords,
    lawyerId,
    categoryId,
  }: CreateDocumentUseCaseRequest): Promise<CreateDocumentUseCaseResponse> {
    await this.checkLawyerExistence(lawyerId);

    const document = await this.documentsRepository.create(
      Document.create({
        title,
        description,
        version: 1,
        keywords,
        lawyerId: new UniqueId(lawyerId),
        categoryId: new UniqueId(categoryId),
      })
    );

    const documentHistory = DocumentHistory.create({
      description: new DocumentHistoryDescription({ type: 'create', document }),
      type: 'create',
      documentId: document.id,
    });

    this.documentHistoriesRepository.create(documentHistory);

    return { document };
  }

  private async checkLawyerExistence(lawyerId: string): Promise<void> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);
  }
}
