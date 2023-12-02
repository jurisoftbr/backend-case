import { UniqueId } from '@/core/entities/unique-id';
import { Document } from '../entities/document';
import { DocumentsRepository } from '../repositories/documents';
import { DocumentLawyersRepository } from '../repositories/document-lawyers';
import { LawyerNotFoundError } from '../errors/lawyer-not-found';
import { inject, injectable } from 'tsyringe';

interface CreateDocumentUseCaseRequest {
  title: string;
  description: string;
  fileUrl: string;
  lawyerId: string;
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
