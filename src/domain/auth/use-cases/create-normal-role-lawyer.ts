import { AuthLawyersRepository } from '../repositories/auth-lawyers';
import { Lawyer } from '../entities/lawyer';
import { LawyerAlreadyExistsError } from '../errors/lawyer-already-exists';
import { inject, injectable } from 'tsyringe';
import { PasswordHasherProvider } from '../providers/password-hasher';
import { TokenGeneratorProvider } from '../providers/token-generator';

interface CreateNormalRoleLawyerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateNormalRoleLawyerUseCaseResponse {
  lawyer: Lawyer;
  token;
}

@injectable()
export class CreateNormalRoleLawyerUseCase {
  constructor(
    @inject('AuthLawyersRepository')
    private lawyersRepository: AuthLawyersRepository,
    @inject('PasswordHasherProvider')
    private passwordHasherProvider: PasswordHasherProvider,
    @inject('TokenGeneratorProvider')
    private tokenGeneratorProvider: TokenGeneratorProvider
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

    const token = await this.tokenGeneratorProvider.execute(
      lawyer.id.value,
      lawyer.role
    );

    return { lawyer, token };
  }
}
