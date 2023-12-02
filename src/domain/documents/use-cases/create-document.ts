import { UniqueId } from '@/core/entities/unique-id';
import { Document } from '../entities/document';
import { DocumentsRepository } from '../repositories/documents';
import { LawyersRepository } from '../repositories/lawyers';
import { LawyerNotFoundError } from '../errors/lawyer-not-found';

interface CreateDocumentUseCaseRequest {
  title: string;
  description: string;
  fileUrl: string;
  lawyerId: string;
}

interface CreateDocumentUseCaseResponse {
  document: Document;
}

export class CreateDocumentUseCase {
  constructor(
    private documentsRepository: DocumentsRepository,
    private lawyersRepository: LawyersRepository
  ) {}

  async execute({
    title,
    description,
    fileUrl,
    lawyerId,
  }: CreateDocumentUseCaseRequest): Promise<CreateDocumentUseCaseResponse> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);

    const document = Document.create({
      title,
      description,
      fileUrl,
      lawyerId: new UniqueId(lawyerId),
    });

    await this.documentsRepository.create(document);

    return { document };
  }
}
