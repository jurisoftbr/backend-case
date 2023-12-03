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
  fileUrl: string;
  lawyerId: string;
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
    fileUrl,
    lawyerId,
  }: UpdateDocumentUseCaseRequest): Promise<UpdateDocumentUseCaseResponse> {
    await this.checkLawyerExistence(lawyerId);

    const document = Document.create(
      {
        title,
        description,
        fileUrl,
        lawyerId: new UniqueId(lawyerId),
      },
      new UniqueId(id)
    );

    await this.documentsRepository.update(document);

    return { document };
  }

  private async checkLawyerExistence(lawyerId): Promise<void> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);
  }
}
