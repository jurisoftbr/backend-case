import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { Lawyer } from '../entities/lawyer';
import { LawyersRepository } from '../repositories/lawyers';

interface FetchLawyerByIdUseCaseRequest {
  lawyerId: string;
}

interface FetchLawyerByIdUseCaseResponse {
  lawyer: Lawyer;
}

export class FetchLawyerByIdUseCase {
  constructor(private lawyersRepository: LawyersRepository) {}

  async execute({
    lawyerId,
  }: FetchLawyerByIdUseCaseRequest): Promise<FetchLawyerByIdUseCaseResponse> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);

    return { lawyer };
  }
}
