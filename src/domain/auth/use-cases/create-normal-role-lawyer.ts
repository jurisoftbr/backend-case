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
    await this.checkLawyerWithSameEmailExistence(email);

    const passwordHash = await this.createHash(password);

    const lawyer = AuthLawyer.create({
      name,
      email,
      password: passwordHash,
      role: 'normal',
    });

    await this.authLawyersRepository.create(lawyer);

    const token = this.generateToken(lawyer.id.value, lawyer.role);

    return { lawyer, token };
  }

  private async checkLawyerWithSameEmailExistence(
    email: string
  ): Promise<void> {
    const lawyerWithSameEmail =
      await this.authLawyersRepository.findByEmail(email);

    if (lawyerWithSameEmail) throw new LawyerAlreadyExistsError(email);
  }

  private async createHash(password: string): Promise<string> {
    return this.passwordHasherProvider.execute(password);
  }

  private generateToken(id: string, role: string): string {
    return this.tokenGeneratorProvider.execute(id, role);
  }
}
