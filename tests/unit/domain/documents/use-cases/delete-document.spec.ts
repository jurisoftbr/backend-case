import { DocumentNotFoundError } from '@/domain/documents/errors/document-not-found';
import { DocumentOwnerError } from '@/domain/documents/errors/document-owner';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { DeleteDocumentUseCase } from '@/domain/documents/use-cases/delete-document';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeLawyer } from 'tests/factories/documents/entities/make-lawyer';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { makeDocumentLawyersRepository } from 'tests/factories/documents/repositories/make-documents-lawyer-repository';
import { Mock } from 'vitest';

describe('DeleteDocumentUseCase', () => {
  let sut: DeleteDocumentUseCase;

  const lawyerMock = makeLawyer();
  const documentMock = makeDocument({ lawyerId: lawyerMock.id });
  const documentsRepositoryMock = makeDocumentsRepository();
  const lawyersRepositoryMock = makeDocumentLawyersRepository();

  beforeEach(() => {
    sut = new DeleteDocumentUseCase(
      documentsRepositoryMock,
      lawyersRepositoryMock
    );

    vi.resetAllMocks();
  });

  describe('execute', () => {
    it('should delete the document when exists', async () => {
      (documentsRepositoryMock.findById as Mock).mockResolvedValueOnce(
        documentMock
      );
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );

      await sut.execute({
        lawyerId: lawyerMock.id.value,
        documentId: documentMock.id.value,
      });

      expect(lawyersRepositoryMock.findById).toHaveBeenCalledWith(
        lawyerMock.id.value
      );
      expect(documentsRepositoryMock.delete).toHaveBeenCalledWith(
        documentMock.id.value
      );
    });
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
    (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(lawyerMock);

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
    (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(lawyerMock);

    expect(
      async () =>
        await sut.execute({
          lawyerId: lawyerMock.id.value,
          documentId: documentMock.id.value,
        })
    ).rejects.toThrowError(DocumentOwnerError);
  });
});
