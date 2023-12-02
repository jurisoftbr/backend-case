import { LawyersRepository } from '../repositories/lawyers';
import { Lawyer } from '../entities/lawyer';
import { LawyerAlreadyExistsError } from '../errors/lawyer-already-exists';

interface CreateNormalRoleLawyerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateNormalRoleLawyerUseCaseResponse {
  lawyer: Lawyer;
}

export class CreateNormalRoleLawyerUseCase {
  constructor(private lawyersRepository: LawyersRepository) {}

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
