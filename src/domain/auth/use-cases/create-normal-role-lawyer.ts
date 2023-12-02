import { LawyersRepository } from '../repositories/lawyers';
import { Lawyer } from '../entities/lawyer';
import { LawyerAlreadyExistsError } from '../errors/lawyer-already-exists';
import { inject, injectable } from 'tsyringe';
import { PasswordHasherProvider } from '../providers/password-hasher';

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
    @inject('LawyersRepository') private lawyersRepository: LawyersRepository,
    @inject('PasswordHasherProvider')
    private passwordHasherProvider: PasswordHasherProvider
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateNormalRoleLawyerUseCaseRequest): Promise<CreateNormalRoleLawyerUseCaseResponse> {
    const lawyerWithSameEmail = await this.lawyersRepository.findByEmail(email);

    if (lawyerWithSameEmail) throw new LawyerAlreadyExistsError(email);

    const passwordHash = await this.passwordHasherProvider.execute(password);

    const lawyer = Lawyer.create({
      name,
      email,
      password: passwordHash,
      role: 'normal',
    });

    await this.lawyersRepository.create(lawyer);

    return { lawyer };
  }
}
