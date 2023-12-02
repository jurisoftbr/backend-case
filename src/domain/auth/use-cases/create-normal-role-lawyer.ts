import { LawyersRepository } from '../repositories/lawyers';
import { Lawyer } from '../entities/lawyer';
import { LawyerAlreadyExistsError } from '../errors/lawyer-already-exists';
import { inject, injectable } from 'tsyringe';

interface CreateNormalRoleLawyerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateNormalRoleLawyerUseCaseResponse {
  lawyer: Lawyer;
}

@injectable()
export class CreateNormalRoleLawyerUseCase {
  constructor(
    @inject('LawyersRepository') private lawyersRepository: LawyersRepository
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateNormalRoleLawyerUseCaseRequest): Promise<CreateNormalRoleLawyerUseCaseResponse> {
    const lawyerWithSameEmail = await this.lawyersRepository.findByEmail(email);

    if (lawyerWithSameEmail) throw new LawyerAlreadyExistsError(email);

    const lawyer = Lawyer.create({
      name,
      email,
      password,
      role: 'normal',
    });

    await this.lawyersRepository.create(lawyer);

    return { lawyer };
  }
}
