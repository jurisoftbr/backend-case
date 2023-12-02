import { inject, injectable } from 'tsyringe';
import { Document } from '../entities/document';
import { Lawyer } from '../entities/lawyer';
import { DocumentNotFoundError } from '../errors/document-not-found';
import { DocumentOwnerError } from '../errors/document-owner';
import { LawyerNotFoundError } from '../errors/lawyer-not-found';
import { DocumentsRepository } from '../repositories/documents';
import { DocumentLawyersRepository } from '../repositories/document-lawyers';

interface FetchDocumentByIdUseCaseRequest {
  lawyerId: string;
  documentId: string;
}

interface FetchDocumentByIdUseCaseResponse {
  document: Document;
}

@injectable()
export class FetchDocumentByIdUseCase {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: DocumentsRepository,
    @inject('DocumentLawyersRepository')
    private lawyersRepository: DocumentLawyersRepository
  ) {}

  async execute({
    lawyerId,
    documentId,
  }: FetchDocumentByIdUseCaseRequest): Promise<FetchDocumentByIdUseCaseResponse> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);
    if (!lawyer) throw new LawyerNotFoundError(lawyerId);

    const document = await this.documentsRepository.findById(documentId);
    if (!document) throw new DocumentNotFoundError(documentId);

    this.validateDocumentOwner(document, lawyer);

    return { document };
  }

  private validateDocumentOwner(document: Document, lawyer: Lawyer) {
    if (document.lawyerId.value !== lawyer.id.value)
      throw new DocumentOwnerError(document.id.value, lawyer.id.value);
  }
}
