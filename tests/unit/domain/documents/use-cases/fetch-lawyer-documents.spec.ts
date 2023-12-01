import { Document } from '@/domain/documents/entities/document';
import { LawyerNotFoundError } from '@/domain/documents/errors/lawyer-not-found';
import { FetchLawyerDocumentsUseCase } from '@/domain/documents/use-cases/fetch-lawyer-documents';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeLawyer } from 'tests/factories/documents/entities/make-lawyer';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { makeLawyersRepository } from 'tests/factories/documents/repositories/make-lawyers-repository';
import { Mock } from 'vitest';

describe('FetchLawyerDocumentsUseCase', () => {
  let sut: FetchLawyerDocumentsUseCase;

  const documentsRepositoryMock = makeDocumentsRepository();
  const lawyersRepositoryMock = makeLawyersRepository();

  beforeEach(() => {
    sut = new FetchLawyerDocumentsUseCase(
      documentsRepositoryMock,
      lawyersRepositoryMock
    );
  });

  describe('execute', () => {
    const lawyerIdMock = 'lawyer id';

    it('should return all documents from lawyer provided', async () => {
      (documentsRepositoryMock.findByLawyerId as Mock).mockResolvedValue([
        makeDocument(),
        makeDocument(),
      ]);
      (lawyersRepositoryMock.findById as Mock).mockResolvedValue(makeLawyer());

      const result = await sut.execute({ lawyerId: lawyerIdMock });

      expect(documentsRepositoryMock.findByLawyerId).toHaveBeenCalledWith(
        lawyerIdMock
      );
      expect(result.documents).toBeInstanceOf(Array<Document>);
      expect(result.documents).toHaveLength(2);
    });

    it('should throws error when lawyer provided does not exists', () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValue(null);

      expect(
        async () => await sut.execute({ lawyerId: lawyerIdMock })
      ).rejects.toThrowError(LawyerNotFoundError);
    });
  });
});
