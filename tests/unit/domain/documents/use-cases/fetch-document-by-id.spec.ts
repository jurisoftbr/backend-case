import { DocumentNotFoundError } from '@/domain/documents/errors/document-not-found';
import { DocumentOwnerError } from '@/domain/documents/errors/document-owner';
import { LawyerNotFoundError } from '@/domain/documents/errors/lawyer-not-found';
import { FetchDocumentByIdUseCase } from '@/domain/documents/use-cases/fetch-document-by-id';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeLawyer } from 'tests/factories/documents/entities/make-lawyer';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { makeLawyersRepository } from 'tests/factories/documents/repositories/make-lawyers-repository';
import { Mock } from 'vitest';

describe('FetchDocumentByIdUseCase', () => {
  let sut: FetchDocumentByIdUseCase;

  const lawyerMock = makeLawyer();
  const documentMock = makeDocument({ lawyerId: lawyerMock.id });
  const documentsRepositoryMock = makeDocumentsRepository();
  const lawyersRepositoryMock = makeLawyersRepository();

  beforeEach(() => {
    sut = new FetchDocumentByIdUseCase(
      documentsRepositoryMock,
      lawyersRepositoryMock
    );
  });

  describe('execute', () => {
    it('should return the document when exists', async () => {
      (documentsRepositoryMock.findById as Mock).mockResolvedValueOnce(
        documentMock
      );
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );

      const result = await sut.execute({
        lawyerId: lawyerMock.id.value,
        documentId: documentMock.id.value,
      });

      expect(lawyersRepositoryMock.findById).toHaveBeenCalledWith(
        lawyerMock.id.value
      );
      expect(documentsRepositoryMock.findById).toHaveBeenCalledWith(
        documentMock.id.value
      );
      expect(result.document).toEqual(documentMock);
    });

    it('should throws error when the lawyer does not exists', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(null);

      expect(
        async () =>
          await sut.execute({
            lawyerId: lawyerMock.id.value,
            documentId: documentMock.id.value,
          })
      ).rejects.toThrowError(LawyerNotFoundError);
    });

    it('should throws error when the document does not exists', async () => {
      (documentsRepositoryMock.findById as Mock).mockResolvedValueOnce(null);
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );

      expect(
        async () =>
          await sut.execute({
            lawyerId: lawyerMock.id.value,
            documentId: documentMock.id.value,
          })
      ).rejects.toThrowError(DocumentNotFoundError);
    });

    it('should throws error when the lawyer does not the document owner', async () => {
      (documentsRepositoryMock.findById as Mock).mockResolvedValueOnce(
        makeDocument()
      );
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );

      expect(
        async () =>
          await sut.execute({
            lawyerId: lawyerMock.id.value,
            documentId: documentMock.id.value,
          })
      ).rejects.toThrowError(DocumentOwnerError);
    });
  });
});
