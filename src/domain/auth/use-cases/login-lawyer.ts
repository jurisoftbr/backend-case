import { Lawyer } from '../entities/lawyer';
import { BadCredentialsError } from '../errors/bad-credentials';
import { PasswordComparatorProvider } from '../providers/password-compator';
import { TokenGeneratorProvider } from '../providers/token-generator';
import { LawyersRepository } from '../repositories/lawyers';

interface LoginLawyerUseCaseRequest {
  email: string;
  password: string;
}

interface LoginLawyerUseCaseResponse {
  lawyer: Lawyer;
  token: string;
}

export class LoginLawyerUseCase {
  constructor(
    private lawyersRepository: LawyersRepository,
    private passwordComparatorProvider: PasswordComparatorProvider,
    private tokenGeneratorProvider: TokenGeneratorProvider
  ) {}

  async execute({
    email,
    password,
  }: LoginLawyerUseCaseRequest): Promise<LoginLawyerUseCaseResponse> {
    const lawyer = await this.lawyersRepository.findByEmail(email);

    if (lawyer === null) throw new BadCredentialsError();

    const isCorrectPassword = this.passwordComparatorProvider.execute(
      lawyer.password,
      password
    );

    if (!isCorrectPassword) throw new BadCredentialsError();

    const token = this.tokenGeneratorProvider.execute(
      lawyer.id.value,
      lawyer.role
    );

    return {
      lawyer,
      token,
    };
  }
}
