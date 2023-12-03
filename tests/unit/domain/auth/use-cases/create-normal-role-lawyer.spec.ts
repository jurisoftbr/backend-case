import { AuthLawyer } from '@/domain/auth/entities/auth-lawyer';
import { LawyerAlreadyExistsError } from '@/domain/auth/errors/lawyer-already-exists';
import { PasswordHasherProvider } from '@/domain/auth/providers/password-hasher';
import { TokenGeneratorProvider } from '@/domain/auth/providers/token-generator';
import { CreateNormalRoleLawyerUseCase } from '@/domain/auth/use-cases/create-normal-role-lawyer';
import { makeAuthLawyer } from 'tests/factories/auth/entities/make-auth-lawyer';
import { makeAuthLawyersRepository } from 'tests/factories/auth/repositories/make-auth-lawyers-repository';
import { Mock } from 'vitest';

describe('CreateNormalRoleLawyerUseCase', () => {
  let sut: CreateNormalRoleLawyerUseCase;

  const authLawyerMock = makeAuthLawyer();
  const authLawyersRepositoryMock = makeAuthLawyersRepository();
  const passwordHasherProviderMock = {
    execute: vi.fn(),
  } as PasswordHasherProvider;
  const tokenGeneratorProviderMock = {
    execute: vi.fn(),
  } as TokenGeneratorProvider;

  beforeEach(() => {
    sut = new CreateNormalRoleLawyerUseCase(
      authLawyersRepositoryMock,
      passwordHasherProviderMock,
      tokenGeneratorProviderMock
    );

    vi.resetAllMocks();
  });

  describe('execute', () => {
    (authLawyersRepositoryMock.findByEmail as Mock).mockResolvedValueOnce(null);

    it('should create a lawyer with normal role', async () => {
      const result = await sut.execute({
        name: authLawyerMock.name,
        email: authLawyerMock.name,
        password: authLawyerMock.password,
      });

      expect(authLawyersRepositoryMock.create).toHaveBeenCalledOnce();
      expect(result.lawyer).toBeInstanceOf(AuthLawyer);
      expect(result.lawyer.role).toBe('normal');
    });

    it('should throws error when a lawyer with same email already exists', async () => {
      (authLawyersRepositoryMock.findByEmail as Mock).mockResolvedValueOnce(
        makeAuthLawyer()
      );

      expect(
        async () =>
          await sut.execute({
            name: authLawyerMock.name,
            email: authLawyerMock.name,
            password: authLawyerMock.password,
          })
      ).rejects.toThrowError(LawyerAlreadyExistsError);
    });

    it('should encrypt the password', async () => {
      (passwordHasherProviderMock.execute as Mock).mockReturnValueOnce(
        'password hash'
      );

      const result = await sut.execute({
        name: authLawyerMock.name,
        email: authLawyerMock.name,
        password: authLawyerMock.password,
      });

      expect(passwordHasherProviderMock.execute).toHaveBeenCalledWith(
        authLawyerMock.password
      );
      expect(result.lawyer.password).toBe('password hash');
    });

    it('should return the token', async () => {
      (tokenGeneratorProviderMock.execute as Mock).mockReturnValueOnce('token');

      const result = await sut.execute({
        name: authLawyerMock.name,
        email: authLawyerMock.name,
        password: authLawyerMock.password,
      });

      expect(tokenGeneratorProviderMock.execute).toHaveBeenCalledWith(
        result.lawyer.id.value,
        result.lawyer.role
      );
      expect(result.token).toBe('token');
    });
  });
});
