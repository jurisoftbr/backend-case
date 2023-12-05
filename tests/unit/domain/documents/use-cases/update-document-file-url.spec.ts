import { UniqueId } from '@/core/entities/unique-id';
import { DocumentHistory } from '@/domain/documents/entities/document-history';
import { DocumentNotFoundError } from '@/domain/documents/errors/document-not-found';
import { UpdateDocumentFileUrlUseCase } from '@/domain/documents/use-cases/update-document-file-url';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeDocumentHistoriesRepository } from 'tests/factories/documents/repositories/make-document-histories-repository';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { Mock } from 'vitest';

describe('UpdateDocumentFileUrlUseCase', () => {
  let sut: UpdateDocumentFileUrlUseCase;

  const documentsRepositoryMock = makeDocumentsRepository();
  const documentHistoriesRepositoryMock = makeDocumentHistoriesRepository();

  beforeEach(() => {
    sut = new UpdateDocumentFileUrlUseCase(
      documentsRepositoryMock,
      documentHistoriesRepositoryMock
    );

    vi.resetAllMocks();
  });

  describe('execute', () => {
    const documentMock = makeDocument({ version: 1 });
    const documentIdMock = new UniqueId();
    const fileNameMock = 'document.pdf';

    it('should update the document file url', async () => {
      (documentsRepositoryMock.findById as Mock).mockResolvedValueOnce(
        documentMock
      );

      const result = await sut.execute({
        documentId: documentIdMock.value,
        fileName: fileNameMock,
      });

      expect(documentsRepositoryMock.updateFile).toHaveBeenCalledWith(
        documentIdMock.value,
        fileNameMock,
        `http://localhost:3333/documents/${documentIdMock}/${fileNameMock}`,
        documentMock.version
      );
      expect(result.fileUrl).toBe(
        `http://localhost:3333/documents/${documentIdMock}/${fileNameMock}`
      );
    });

    it('should create a document history when update', async () => {
      (documentsRepositoryMock.findById as Mock).mockResolvedValueOnce(
        documentMock
      );

      await sut.execute({
        documentId: documentIdMock.value,
        fileName: fileNameMock,
      });

      expect(documentsRepositoryMock.updateFile).toHaveBeenCalledOnce();
      expect(documentHistoriesRepositoryMock.create).toHaveBeenCalledWith(
        expect.any(DocumentHistory)
      );
      expect(documentHistoriesRepositoryMock.create).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'updateFile' })
      );
    });

    it('should throws error when the document does not exists', async () => {
      (documentsRepositoryMock.findById as Mock).mockResolvedValueOnce(null);

      expect(
        async () =>
          await sut.execute({
            documentId: documentIdMock.value,
            fileName: fileNameMock,
          })
      ).rejects.toThrowError(DocumentNotFoundError);
    });
  });
});
