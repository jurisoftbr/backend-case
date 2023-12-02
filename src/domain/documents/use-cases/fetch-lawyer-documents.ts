import { inject, injectable } from 'tsyringe';
import { Document } from '../entities/document';
import { LawyerNotFoundError } from '../errors/lawyer-not-found';
import { DocumentsRepository } from '../repositories/documents';
import { DocumentLawyersRepository } from '../repositories/document-lawyers';

interface FetchLawyerDocumentsUseCaseRequest {
  lawyerId: string;
}

interface FetchLawyerDocumentsUseCaseResponse {
  documents: Document[];
}

@injectable()
export class FetchLawyerDocumentsUseCase {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: DocumentsRepository,
    @inject('DocumentLawyersRepository')
    private lawyersRepository: DocumentLawyersRepository
  ) {}

  async execute({
    lawyerId,
  }: FetchLawyerDocumentsUseCaseRequest): Promise<FetchLawyerDocumentsUseCaseResponse> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);

    const documents = await this.documentsRepository.findByLawyerId(lawyerId);

    return { documents };
  }
}
