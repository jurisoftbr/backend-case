import { Document } from '@/domain/documents/entities/document';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { UpdateDocumentUseCase } from '@/domain/documents/use-cases/update-document';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeLawyer } from 'tests/factories/documents/entities/make-lawyer';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { makeDocumentLawyersRepository } from 'tests/factories/documents/repositories/make-documents-lawyer-repository';
import { Mock } from 'vitest';

describe('UpdateDocumentUseCase', () => {
  let sut: UpdateDocumentUseCase;

  const lawyerMock = makeLawyer();
  const documentMock = makeDocument({ lawyerId: lawyerMock.id });
  const documentsRepositoryMock = makeDocumentsRepository();
  const lawyersRepositoryMock = makeDocumentLawyersRepository();

  beforeEach(() => {
    sut = new UpdateDocumentUseCase(
      documentsRepositoryMock,
      lawyersRepositoryMock
    );

    vi.resetAllMocks();
  });

  describe('execute', () => {
    it('should update a document', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );

      const result = await sut.execute({
        id: documentMock.id.value,
        title: documentMock.title,
        description: 'Updated description',
        version: 1,
        keywords: documentMock.keywords,
        lawyerId: documentMock.lawyerId.value,
        categoryId: documentMock.categoryId.value,
      });

      expect(lawyersRepositoryMock.findById).toHaveBeenCalledWith(
        lawyerMock.id.value
      );
      expect(documentsRepositoryMock.update).toHaveBeenCalledOnce();
      expect(result.document).toBeInstanceOf(Document);
      expect(result.document.id).toStrictEqual(documentMock.id);
      expect(result.document.description).toBe('Updated description');
    });

    it('should increment 1 to document version when update', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );

      const result = await sut.execute({
        id: documentMock.id.value,
        title: documentMock.title,
        description: 'Updated description',
        version: 1,
        keywords: documentMock.keywords,
        lawyerId: documentMock.lawyerId.value,
        categoryId: documentMock.categoryId.value,
      });

      expect(documentsRepositoryMock.update).toHaveBeenCalledOnce();
      expect(result.document.version).toBe(2);
    });

    it('should throws error when the lawyer does not exists', () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(null);

      expect(
        async () =>
          await sut.execute({
            id: documentMock.id.value,
            title: documentMock.title,
            description: 'Updated description',
            version: 1,
            keywords: documentMock.keywords,
            lawyerId: documentMock.lawyerId.value,
            categoryId: documentMock.categoryId.value,
          })
      ).rejects.toThrowError(LawyerNotFoundError);
    });
  });
});
