import { Document } from '@/domain/documents/entities/document';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { CreateDocumentUseCase } from '@/domain/documents/use-cases/create-document';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeLawyer } from 'tests/factories/documents/entities/make-lawyer';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { makeDocumentLawyersRepository } from 'tests/factories/documents/repositories/make-documents-lawyer-repository';
import { Mock } from 'vitest';

describe('CreateDocumentUseCase', () => {
  let sut: CreateDocumentUseCase;

  const lawyerMock = makeLawyer();
  const documentMock = makeDocument({ lawyerId: lawyerMock.id });
  const documentsRepositoryMock = makeDocumentsRepository();
  const lawyersRepositoryMock = makeDocumentLawyersRepository();

  beforeEach(() => {
    sut = new CreateDocumentUseCase(
      documentsRepositoryMock,
      lawyersRepositoryMock
    );
    vi.resetAllMocks();
  });

  describe('execute', () => {
    it('should create a document', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );

      const result = await sut.execute({
        title: documentMock.title,
        description: documentMock.description,
        keywords: documentMock.keywords,
        lawyerId: documentMock.lawyerId.value,
        categoryId: documentMock.categoryId.value,
      });

      expect(lawyersRepositoryMock.findById).toHaveBeenCalledWith(
        lawyerMock.id.value
      );
      expect(documentsRepositoryMock.create).toHaveBeenCalledOnce();
      expect(result.document).toBeInstanceOf(Document);
    });

    it('should version be 1 when create a document', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );

      const result = await sut.execute({
        title: documentMock.title,
        description: documentMock.description,
        keywords: documentMock.keywords,
        lawyerId: documentMock.lawyerId.value,
        categoryId: documentMock.categoryId.value,
      });

      expect(documentsRepositoryMock.create).toHaveBeenCalledOnce();
      expect(result.document.version).toBe(1);
    });

    it('should throws error when the lawyer does not exists', () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(null);

      expect(
        async () =>
          await sut.execute({
            title: documentMock.title,
            description: documentMock.description,
            keywords: documentMock.keywords,
            lawyerId: documentMock.lawyerId.value,
            categoryId: documentMock.categoryId.value,
          })
      ).rejects.toThrowError(LawyerNotFoundError);
    });
  });
});
