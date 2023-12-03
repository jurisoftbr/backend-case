import { UniqueId } from '@/core/entities/unique-id';
import { DocumentNotFoundError } from '@/domain/documents/errors/document-not-found';
import { UpdateDocumentFileUrlUseCase } from '@/domain/documents/use-cases/update-document-file-url';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { Mock } from 'vitest';

describe('UpdateDocumentFileUrlUseCase', () => {
  let sut: UpdateDocumentFileUrlUseCase;

  const documentsRepositoryMock = makeDocumentsRepository();

  beforeEach(() => {
    sut = new UpdateDocumentFileUrlUseCase(documentsRepositoryMock);
  });

  describe('execute', () => {
    const documentIdMock = new UniqueId();
    const fileNameMock = 'document.pdf';

    it('should update the document file url', async () => {
      (documentsRepositoryMock.findById as Mock).mockResolvedValueOnce(
        makeDocument()
      );

      const result = await sut.execute({
        documentId: documentIdMock.value,
        fileName: fileNameMock,
      });

      expect(documentsRepositoryMock.updateFileUrl).toHaveBeenCalledWith(
        documentIdMock.value,
        `http://localhost:3333/documents/${documentIdMock}/${fileNameMock}`
      );
      expect(result.fileUrl).toBe(
        `http://localhost:3333/documents/${documentIdMock}/${fileNameMock}`
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
