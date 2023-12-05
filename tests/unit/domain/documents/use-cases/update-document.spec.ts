import { Document } from '@/domain/documents/entities/document';
import { LawyerNotFoundError } from '@/core/errors/lawyer-not-found';
import { UpdateDocumentUseCase } from '@/domain/documents/use-cases/update-document';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeLawyer } from 'tests/factories/documents/entities/make-lawyer';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { makeDocumentLawyersRepository } from 'tests/factories/documents/repositories/make-documents-lawyer-repository';
import { Mock } from 'vitest';
import { makeDocumentHistoriesRepository } from 'tests/factories/documents/repositories/make-document-histories-repository';
import { DocumentHistory } from '@/domain/documents/entities/document-history';

describe('UpdateDocumentUseCase', () => {
  let sut: UpdateDocumentUseCase;

  const lawyerMock = makeLawyer();
  const documentMock = makeDocument({ lawyerId: lawyerMock.id, version: 2 });
  const documentsRepositoryMock = makeDocumentsRepository();
  const lawyersRepositoryMock = makeDocumentLawyersRepository();
  const documentHistoriesRepositoryMock = makeDocumentHistoriesRepository();

  beforeEach(() => {
    sut = new UpdateDocumentUseCase(
      documentsRepositoryMock,
      lawyersRepositoryMock,
      documentHistoriesRepositoryMock
    );

    vi.resetAllMocks();
  });

  describe('execute', () => {
    it('should update a document', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );
      (documentsRepositoryMock.update as Mock).mockResolvedValueOnce(
        documentMock
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
      expect(documentsRepositoryMock.update).toHaveBeenCalledWith(
        expect.objectContaining({
          props: expect.objectContaining({
            description: 'Updated description',
          }),
        })
      );
    });

    it('should increment 1 to document version when update', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );
      (documentsRepositoryMock.update as Mock).mockResolvedValueOnce(
        documentMock
      );

      await sut.execute({
        id: documentMock.id.value,
        title: documentMock.title,
        description: 'Updated description',
        version: 1,
        keywords: documentMock.keywords,
        lawyerId: documentMock.lawyerId.value,
        categoryId: documentMock.categoryId.value,
      });

      expect(documentsRepositoryMock.update).toHaveBeenCalledOnce();
      expect(documentsRepositoryMock.update).toHaveBeenCalledWith(
        expect.objectContaining({
          props: expect.objectContaining({
            version: 2,
          }),
        })
      );
    });

    it('should create a document history when update', async () => {
      (lawyersRepositoryMock.findById as Mock).mockResolvedValueOnce(
        lawyerMock
      );
      (documentsRepositoryMock.update as Mock).mockResolvedValueOnce(
        documentMock
      );

      await sut.execute({
        id: documentMock.id.value,
        title: documentMock.title,
        description: 'Updated description',
        version: 1,
        keywords: documentMock.keywords,
        lawyerId: documentMock.lawyerId.value,
        categoryId: documentMock.categoryId.value,
      });

      expect(documentsRepositoryMock.update).toHaveBeenCalledOnce();
      expect(documentHistoriesRepositoryMock.create).toHaveBeenCalledWith(
        expect.any(DocumentHistory)
      );
      expect(documentHistoriesRepositoryMock.create).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'update' })
      );
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
