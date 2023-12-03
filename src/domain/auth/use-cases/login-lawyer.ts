import { AuthLawyer } from '../entities/auth-lawyer';
import { BadCredentialsError } from '../errors/bad-credentials';
import { PasswordComparatorProvider } from '../providers/password-comparator';
import { TokenGeneratorProvider } from '../providers/token-generator';
import { AuthLawyersRepository } from '../repositories/auth-lawyers';
import { injectable, inject } from 'tsyringe';

interface LoginLawyerUseCaseRequest {
  email: string;
  password: string;
}

interface LoginLawyerUseCaseResponse {
  lawyer: AuthLawyer;
  token: string;
}

@injectable()
export class LoginLawyerUseCase {
  constructor(
    @inject('AuthLawyersRepository')
    private authLawyersRepository: AuthLawyersRepository,
    @inject('PasswordComparatorProvider')
    private passwordComparatorProvider: PasswordComparatorProvider,
    @inject('TokenGeneratorProvider')
    private tokenGeneratorProvider: TokenGeneratorProvider
  ) {}

  async execute({
    email,
    password,
  }: LoginLawyerUseCaseRequest): Promise<LoginLawyerUseCaseResponse> {
    const lawyer = await this.authLawyersRepository.findByEmail(email);

    if (!lawyer) throw new BadCredentialsError();

    const isCorrectPassword = await this.passwordComparatorProvider.execute(
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
