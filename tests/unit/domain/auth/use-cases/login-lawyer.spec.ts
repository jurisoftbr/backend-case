import { Lawyer } from '@/domain/auth/entities/lawyer';
import { BadCredentialsError } from '@/domain/auth/errors/bad-credentials';
import { PasswordComparatorProvider } from '@/domain/auth/providers/password-compator';
import { TokenGeneratorProvider } from '@/domain/auth/providers/token-generator';
import { LoginLawyerUseCase } from '@/domain/auth/use-cases/login-lawyer';
import { makeLawyer } from 'tests/factories/auth/entities/make-lawyer';
import { makeLawyersRepository } from 'tests/factories/auth/repositories/make-lawyers-repository';
import { Mock } from 'vitest';

describe('LoginLawyerUseCase', () => {
  let sut: LoginLawyerUseCase;

  const lawyerMock = makeLawyer();
  const lawyersRepositoryMock = makeLawyersRepository();
  const passwordComparatorProviderMock = {
    execute: vi.fn(),
  } as PasswordComparatorProvider;
  const tokenGeneratorProviderMock = {
    execute: vi.fn(),
  } as TokenGeneratorProvider;

  beforeEach(() => {
    sut = new LoginLawyerUseCase(
      lawyersRepositoryMock,
      passwordComparatorProviderMock,
      tokenGeneratorProviderMock
    );

    vi.resetAllMocks();
  });

  describe('execute', () => {
    it('should return the lawyer and token when login successfully', async () => {
      (lawyersRepositoryMock.findByEmail as Mock).mockResolvedValueOnce(
        lawyerMock
      );
      (passwordComparatorProviderMock.execute as Mock).mockReturnValueOnce(
        true
      );
      (tokenGeneratorProviderMock.execute as Mock).mockReturnValue('token');

      const result = await sut.execute({
        email: lawyerMock.email,
        password: lawyerMock.password,
      });

      expect(lawyersRepositoryMock.findByEmail).toHaveBeenCalledWith(
        lawyerMock.email
      );
      expect(result.lawyer).toBeInstanceOf(Lawyer);
      expect(result.token).toBe('token');
    });

    it('should throws error when lawyer is not found by email', async () => {
      (lawyersRepositoryMock.findByEmail as Mock).mockResolvedValueOnce(null);

      expect(
        async () =>
          await sut.execute({
            email: lawyerMock.email,
            password: lawyerMock.password,
          })
      ).rejects.toThrowError(BadCredentialsError);
    });

    it('should throws error when password is incorrect', async () => {
      (lawyersRepositoryMock.findByEmail as Mock).mockResolvedValueOnce(
        lawyerMock
      );
      (passwordComparatorProviderMock.execute as Mock).mockReturnValueOnce(
        false
      );

      expect(
        async () =>
          await sut.execute({
            email: lawyerMock.email,
            password: 'password to compare',
          })
      ).rejects.toThrowError(BadCredentialsError);
    });
  });
});
