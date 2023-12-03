import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { FetchLawyerByIdUseCase } from '@/domain/lawyers/use-cases/fetch-lawyer-by-id';
import { makeLawyer } from 'tests/factories/lawyers/entities/make-lawyer';
import { makeLawyersRepository } from 'tests/factories/lawyers/repositories/make-lawyer-repository';
import { Mock } from 'vitest';

describe('FetchLawyerByIdUseCase', () => {
  let sut: FetchLawyerByIdUseCase;

  const lawyerMock = makeLawyer();
  const lawyersRepositoryMock = makeLawyersRepository();

  beforeEach(() => {
    sut = new FetchLawyerByIdUseCase(lawyersRepositoryMock);

    vi.resetAllMocks();
  });

  describe('execute', () => {
    it('should return the lawyer when exists', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );

      const result = await sut.execute({ lawyerId: lawyerMock.id.value });

      expect(lawyersRepositoryMock.findById).toHaveBeenCalledWith(
        lawyerMock.id.value
      );
      expect(result.lawyer).toEqual(lawyerMock);
    });

    it('should throws error when lawyer does not found', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(null);

      expect(
        async () =>
          await sut.execute({
            lawyerId: lawyerMock.id.value,
          })
      ).rejects.toThrowError(LawyerNotFoundError);
    });
  });
});
