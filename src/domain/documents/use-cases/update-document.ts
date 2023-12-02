import { UniqueId } from '@/core/entities/unique-id';
import { Document } from '../entities/document';
import { DocumentsRepository } from '../repositories/documents';
import { LawyersRepository } from '../repositories/lawyers';
import { LawyerNotFoundError } from '../errors/lawyer-not-found';
import { inject, injectable } from 'tsyringe';

interface UpdateDocumentUseCaseRequest {
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
    @inject('LawyersRepository')
    private lawyersRepository: LawyersRepository
  ) {}

  async execute({
    title,
    description,
    fileUrl,
    lawyerId,
  }: UpdateDocumentUseCaseRequest): Promise<UpdateDocumentUseCaseResponse> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);

    const document = Document.create({
      title,
      description,
      fileUrl,
      lawyerId: new UniqueId(lawyerId),
    });

    await this.documentsRepository.update(document);

    return { document };
  }
}
