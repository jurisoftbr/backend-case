import { Document } from '../entities/document';
import { Lawyer } from '../entities/lawyer';
import { DocumentNotFoundError } from '../errors/document-not-found';
import { DocumentOwnerError } from '../errors/document-owner';
import { LawyerNotFoundError } from '../errors/lawyer-not-found';
import { DocumentsRepository } from '../repositories/documents';
import { LawyersRepository } from '../repositories/lawyers';

interface DeleteDocumentUseCaseRequest {
  lawyerId: string;
  documentId: string;
}

export class DeleteDocumentUseCase {
  constructor(
    private documentsRepository: DocumentsRepository,
    private lawyersRepository: LawyersRepository
  ) {}

  async execute({
    documentId,
    lawyerId,
  }: DeleteDocumentUseCaseRequest): Promise<void> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);
    if (!lawyer) throw new LawyerNotFoundError(lawyerId);

    const document = await this.documentsRepository.findById(documentId);
    if (!document) throw new DocumentNotFoundError(documentId);

    this.validateDocumentOwner(document, lawyer);

    await this.documentsRepository.delete(document.id.value);
  }

  private validateDocumentOwner(document: Document, lawyer: Lawyer) {
    if (document.lawyerId.value !== lawyer.id.value)
      throw new DocumentOwnerError(document.id.value, lawyer.id.value);
  }
}
