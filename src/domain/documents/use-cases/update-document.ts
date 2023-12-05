import { UniqueId } from '@/core/entities/unique-id';
import { Document } from '../entities/document';
import { DocumentsRepository } from '../repositories/documents';
import { DocumentLawyersRepository } from '../repositories/document-lawyers';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { inject, injectable } from 'tsyringe';

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
    private lawyersRepository: DocumentLawyersRepository
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

    const document = Document.create(
      {
        title,
        description,
        version: version + 1,
        keywords,
        lawyerId: new UniqueId(lawyerId),
        categoryId: new UniqueId(categoryId),
      },
      new UniqueId(id)
    );

    await this.documentsRepository.update(document);

    return { document };
  }

  private async checkLawyerExistence(lawyerId: string): Promise<void> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);
  }
}
