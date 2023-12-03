import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { Lawyer } from '../entities/lawyer';
import { LawyersRepository } from '../repositories/lawyers';
import { inject, injectable } from 'tsyringe';

interface FetchLawyerByIdUseCaseRequest {
  lawyerId: string;
}

interface FetchLawyerByIdUseCaseResponse {
  lawyer: Lawyer;
}

@injectable()
export class FetchLawyerByIdUseCase {
  constructor(
    @inject('LawyersRepository') private lawyersRepository: LawyersRepository
  ) {}

  async execute({
    lawyerId,
  }: FetchLawyerByIdUseCaseRequest): Promise<FetchLawyerByIdUseCaseResponse> {
    const lawyer = await this.lawyersRepository.findById(lawyerId);

    if (!lawyer) throw new LawyerNotFoundError(lawyerId);

    return { lawyer };
  }
}
