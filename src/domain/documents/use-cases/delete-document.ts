import { inject, injectable } from 'tsyringe';
import { Document } from '../entities/document';
import { Lawyer } from '../entities/lawyer';
import { DocumentNotFoundError } from '../errors/document-not-found';
import { DocumentOwnerError } from '../errors/document-owner';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { DocumentsRepository } from '../repositories/documents';
import { DocumentLawyersRepository } from '../repositories/document-lawyers';
import { DeleteDocumentFileProvider } from '../providers/delete-document-file';

interface DeleteDocumentUseCaseRequest {
  lawyerId: string;
  documentId: string;
}

@injectable()
export class DeleteDocumentUseCase {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: DocumentsRepository,
    @inject('DocumentLawyersRepository')
    private lawyersRepository: DocumentLawyersRepository
    // @inject('DeleteDocumentFileProvider')
    // private deleteDocumentFileProvider: DeleteDocumentFileProvider
  ) {}

  async execute({
    documentId,
    lawyerId,
  }: DeleteDocumentUseCaseRequest): Promise<void> {
    const lawyer = await this.findLawyer(lawyerId);

    const document = await this.findDocument(documentId);

    this.validateDocumentOwner(document, lawyer);

    await this.documentsRepository.delete(document.id.value);
  }

  private async findLawyer(lawyerId): Promise<Lawyer> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);

    return lawyer;
  }

  private async findDocument(documentId): Promise<Document> {
    const document = await this.documentsRepository.findById(documentId);

    if (!document) throw new DocumentNotFoundError(documentId);

    return document;
  }

  private validateDocumentOwner(document: Document, lawyer: Lawyer) {
    if (document.lawyerId.value !== lawyer.id.value)
      throw new DocumentOwnerError(document.id.value, lawyer.id.value);
  }

  private getFileNameFromFileUrl() {}
}
