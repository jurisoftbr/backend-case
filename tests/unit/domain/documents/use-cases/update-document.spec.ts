import { Document } from '@/domain/documents/entities/document';
import { LawyerNotFoundError } from '@/domain/documents/errors/lawyer-not-found';
import { UpdateDocumentUseCase } from '@/domain/documents/use-cases/update-document';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeLawyer } from 'tests/factories/documents/entities/make-lawyer';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { makeLawyersRepository } from 'tests/factories/documents/repositories/make-lawyers-repository';
import { Mock } from 'vitest';

describe('UpdateDocumentUseCase', () => {
  let sut: UpdateDocumentUseCase;

  const lawyerMock = makeLawyer();
  const documentMock = makeDocument({ lawyerId: lawyerMock.id });
  const documentsRepositoryMock = makeDocumentsRepository();
  const lawyersRepositoryMock = makeLawyersRepository();

  beforeEach(() => {
    sut = new UpdateDocumentUseCase(
      documentsRepositoryMock,
      lawyersRepositoryMock
    );
  });

  describe('execute', () => {
    it('should update a document', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );

      const result = await sut.execute({
        id: documentMock.id.value,
        title: documentMock.title,
        description: documentMock.description,
        fileUrl: documentMock.fileUrl,
        lawyerId: documentMock.lawyerId.value,
      });

      expect(lawyersRepositoryMock.findById).toHaveBeenCalledWith(
        lawyerMock.id.value
      );
      expect(documentsRepositoryMock.update).toHaveBeenCalledOnce();
      expect(result.document).toBeInstanceOf(Document);
      expect(result.document.id).toStrictEqual(documentMock.id);
    });

    it('should throws error when the lawyer does not exists', () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(null);

      expect(
        async () =>
          await sut.execute({
            id: documentMock.id.value,
            title: documentMock.title,
            description: documentMock.description,
            fileUrl: documentMock.fileUrl,
            lawyerId: documentMock.lawyerId.value,
          })
      ).rejects.toThrowError(LawyerNotFoundError);
    });
  });
});
