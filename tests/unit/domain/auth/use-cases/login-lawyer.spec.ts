import { AuthLawyer } from '@/domain/auth/entities/auth-lawyer';
import { BadCredentialsError } from '@/domain/auth/errors/bad-credentials';
import { PasswordComparatorProvider } from '@/domain/auth/providers/password-comparator';
import { TokenGeneratorProvider } from '@/domain/auth/providers/token-generator';
import { LoginLawyerUseCase } from '@/domain/auth/use-cases/login-lawyer';
import { makeAuthLawyer } from 'tests/factories/auth/entities/make-auth-lawyer';
import { makeAuthLawyersRepository } from 'tests/factories/auth/repositories/make-auth-lawyers-repository';
import { Mock } from 'vitest';

describe('LoginLawyerUseCase', () => {
  let sut: LoginLawyerUseCase;

  const authLawyerMock = makeAuthLawyer();
  const authLawyersRepositoryMock = makeAuthLawyersRepository();
  const passwordComparatorProviderMock = {
    execute: vi.fn(),
  } as PasswordComparatorProvider;
  const tokenGeneratorProviderMock = {
    execute: vi.fn(),
  } as TokenGeneratorProvider;

  beforeEach(() => {
    sut = new LoginLawyerUseCase(
      authLawyersRepositoryMock,
      passwordComparatorProviderMock,
      tokenGeneratorProviderMock
    );

    vi.resetAllMocks();
  });

  describe('execute', () => {
    it('should return the lawyer and token when login successfully', async () => {
      (authLawyersRepositoryMock.findByEmail as Mock).mockResolvedValueOnce(
        authLawyerMock
      );
      (passwordComparatorProviderMock.execute as Mock).mockReturnValueOnce(
        true
      );
      (tokenGeneratorProviderMock.execute as Mock).mockReturnValue('token');

      const result = await sut.execute({
        email: authLawyerMock.email,
        password: authLawyerMock.password,
      });

      expect(authLawyersRepositoryMock.findByEmail).toHaveBeenCalledWith(
        authLawyerMock.email
      );
      expect(result.lawyer).toBeInstanceOf(AuthLawyer);
      expect(result.token).toBe('token');
    });

    it('should throws error when lawyer is not found by email', async () => {
      (authLawyersRepositoryMock.findByEmail as Mock).mockResolvedValueOnce(
        null
      );

      expect(
        async () =>
          await sut.execute({
            email: authLawyerMock.email,
            password: authLawyerMock.password,
          })
      ).rejects.toThrowError(BadCredentialsError);
    });

    it('should throws error when password is incorrect', async () => {
      (authLawyersRepositoryMock.findByEmail as Mock).mockResolvedValueOnce(
        authLawyerMock
      );
      (passwordComparatorProviderMock.execute as Mock).mockReturnValueOnce(
        false
      );

      expect(
        async () =>
          await sut.execute({
            email: authLawyerMock.email,
            password: 'password to compare',
          })
      ).rejects.toThrowError(BadCredentialsError);
    });
  });
});
