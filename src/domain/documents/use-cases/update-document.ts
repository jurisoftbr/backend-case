import { UniqueId } from '@/core/entities/unique-id';
import { Document } from '../entities/document';
import { DocumentsRepository } from '../repositories/documents';
import { DocumentLawyersRepository } from '../repositories/document-lawyers';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { inject, injectable } from 'tsyringe';
import { DocumentHistoriesRepository } from '../repositories/document-histories';
import { DocumentHistory } from '../entities/document-history';
import { DocumentHistoryDescription } from '../entities/value-objects/document-history-description';

interface UpdateDocumentUseCaseRequest {
  id: string;
  title: string;
  description: string;
  version: number;
  keywords: string[];
  lawyerId: string;
  categoryId: string;
}

interface UpdateDocumentUseCaseResponse {
  document: Document;
}

@injectable()
export class UpdateDocumentUseCase {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: DocumentsRepository,
    @inject('DocumentLawyersRepository')
    private lawyersRepository: DocumentLawyersRepository,
    @inject('DocumentHistoriesRepository')
    private documentHistoriesRepository: DocumentHistoriesRepository
  ) {}

  async execute({
    id,
    title,
    description,
    version,
    keywords,
    lawyerId,
    categoryId,
  }: UpdateDocumentUseCaseRequest): Promise<UpdateDocumentUseCaseResponse> {
    await this.checkLawyerExistence(lawyerId);

    const document = await this.documentsRepository.update(
      Document.create(
        {
          title,
          description,
          version: version + 1,
          keywords,
          lawyerId: new UniqueId(lawyerId),
          categoryId: new UniqueId(categoryId),
        },
        new UniqueId(id)
      )
    );

    await this.createDocumentUpdateHistory(document);

    return { document };
  }

  private async checkLawyerExistence(lawyerId: string): Promise<void> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);
  }

  private async createDocumentUpdateHistory(document: Document) {
    const documentHistory = DocumentHistory.create({
      description: DocumentHistoryDescription.createFromType({
        type: 'update',
        document,
      }),
      type: 'update',
      documentId: document.id,
    });

    return this.documentHistoriesRepository.create(documentHistory);
  }
}
