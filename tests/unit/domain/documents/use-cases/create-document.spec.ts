import { Document } from '@/domain/documents/entities/document';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { CreateDocumentUseCase } from '@/domain/documents/use-cases/create-document';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeLawyer } from 'tests/factories/documents/entities/make-lawyer';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { makeDocumentLawyersRepository } from 'tests/factories/documents/repositories/make-documents-lawyer-repository';
import { Mock } from 'vitest';
import { makeDocumentHistoriesRepository } from 'tests/factories/documents/repositories/make-document-histories-repository';
import { DocumentHistory } from '@/domain/documents/entities/document-history';

describe('CreateDocumentUseCase', () => {
  let sut: CreateDocumentUseCase;

  const lawyerMock = makeLawyer();
  const documentMock = makeDocument({
    lawyerId: lawyerMock.id,
    version: 1,
    createdAt: new Date('2023-12-05T09:49:00-03:00'),
  });
  const documentsRepositoryMock = makeDocumentsRepository();
  const lawyersRepositoryMock = makeDocumentLawyersRepository();
  const documentHistoriesRepositoryMock = makeDocumentHistoriesRepository();

  beforeEach(() => {
    sut = new CreateDocumentUseCase(
      documentsRepositoryMock,
      lawyersRepositoryMock,
      documentHistoriesRepositoryMock
    );
    vi.resetAllMocks();
  });

  describe('execute', () => {
    it('should create a document', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );
      (documentsRepositoryMock.create as Mock).mockResolvedValueOnce(
        documentMock
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
      (documentsRepositoryMock.create as Mock).mockResolvedValueOnce(
        documentMock
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

    it('should create a history when create a document', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );
      (documentsRepositoryMock.create as Mock).mockResolvedValueOnce(
        documentMock
      );

      await sut.execute({
        title: documentMock.title,
        description: documentMock.description,
        keywords: documentMock.keywords,
        lawyerId: documentMock.lawyerId.value,
        categoryId: documentMock.categoryId.value,
      });

      expect(documentsRepositoryMock.create).toHaveBeenCalledOnce();
      expect(documentHistoriesRepositoryMock.create).toHaveBeenCalledWith(
        expect.any(DocumentHistory)
      );
      expect(
        (documentHistoriesRepositoryMock.create as Mock).mock.lastCall[0].props
          .description.text
      ).toBe(
        `The document ${documentMock.title} was created on 05/12/2023 at 09:49`
      );
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
