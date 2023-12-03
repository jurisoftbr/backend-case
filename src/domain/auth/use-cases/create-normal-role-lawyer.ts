import { AuthLawyersRepository } from '../repositories/auth-lawyers';
import { AuthLawyer } from '../entities/auth-lawyer';
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
  lawyer: AuthLawyer;
  token;
}

@injectable()
export class CreateNormalRoleLawyerUseCase {
  constructor(
    @inject('AuthLawyersRepository')
    private authLawyersRepository: AuthLawyersRepository,
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
    const lawyerWithSameEmail =
      await this.authLawyersRepository.findByEmail(email);

    if (lawyerWithSameEmail) throw new LawyerAlreadyExistsError(email);

    const passwordHash = await this.passwordHasherProvider.execute(password);

    const lawyer = AuthLawyer.create({
      name,
      email,
      password: passwordHash,
      role: 'normal',
    });

    await this.authLawyersRepository.create(lawyer);

    const token = await this.tokenGeneratorProvider.execute(
      lawyer.id.value,
      lawyer.role
    );

    return { lawyer, token };
  }
}
