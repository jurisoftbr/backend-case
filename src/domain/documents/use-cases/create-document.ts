import { UniqueId } from '@/core/entities/unique-id';
import { Document } from '../entities/document';
import { DocumentsRepository } from '../repositories/documents';
import { DocumentLawyersRepository } from '../repositories/document-lawyers';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { inject, injectable } from 'tsyringe';

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
    private lawyersRepository: DocumentLawyersRepository
  ) {}

  async execute({
    title,
    description,
    keywords,
    lawyerId,
    categoryId,
  }: CreateDocumentUseCaseRequest): Promise<CreateDocumentUseCaseResponse> {
    await this.checkLawyerExistence(lawyerId);

    const document = Document.create({
      title,
      description,
      keywords,
      lawyerId: new UniqueId(lawyerId),
      categoryId: new UniqueId(categoryId),
    });

    await this.documentsRepository.create(document);

    return { document };
  }

  private async checkLawyerExistence(lawyerId: string): Promise<void> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);
  }
}
