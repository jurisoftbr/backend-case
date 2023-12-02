import { Lawyer } from '@/domain/auth/entities/lawyer';
import { LawyerAlreadyExistsError } from '@/domain/auth/errors/lawyer-already-exists';
import { CreateNormalRoleLawyerUseCase } from '@/domain/auth/use-cases/create-normal-role-lawyer';
import { makeLawyer } from 'tests/factories/auth/entities/make-lawyer';
import { makeLawyersRepository } from 'tests/factories/auth/repositories/make-lawyers-repository';
import { Mock } from 'vitest';

describe('CreateNormalRoleLawyerUseCase', () => {
  let sut: CreateNormalRoleLawyerUseCase;

  const lawyerMock = makeLawyer();
  const lawyersRepositoryMock = makeLawyersRepository();

  beforeEach(() => {
    sut = new CreateNormalRoleLawyerUseCase(lawyersRepositoryMock);
  });

  describe('execute', () => {
    it('should create a lawyer', async () => {
      (lawyersRepositoryMock.findByEmail as Mock).mockResolvedValueOnce(null);

      const result = await sut.execute({
        name: lawyerMock.name,
        email: lawyerMock.name,
        password: lawyerMock.password,
      });

      expect(lawyersRepositoryMock.create).toHaveBeenCalledOnce();
      expect(result.lawyer).toBeInstanceOf(Lawyer);
    });

    it('should throws error when a lawyer with same email already exists', async () => {
      (lawyersRepositoryMock.findByEmail as Mock).mockResolvedValueOnce(
        makeLawyer()
      );

      expect(
        async () =>
          await sut.execute({
            name: lawyerMock.name,
            email: lawyerMock.name,
            password: lawyerMock.password,
          })
      ).rejects.toThrowError(LawyerAlreadyExistsError);
    });
  });
});
