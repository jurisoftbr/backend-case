import { Document } from '../entities/document';
import { LawyerNotFoundError } from '../errors/lawyer-not-found';
import { DocumentsRepository } from '../repositories/documents';
import { LawyersRepository } from '../repositories/lawyers';

interface FetchLawyerDocumentsUseCaseRequest {
  lawyerId: string;
}

interface FetchLawyerDocumentsUseCaseResponse {
  documents: Document[];
}

export class FetchLawyerDocumentsUseCase {
  constructor(
    private documentsRepository: DocumentsRepository,
    private lawyersRepository: LawyersRepository
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
