import { DocumentHistory } from '@/domain/documents/entities/document-history';
import { DocumentNotFoundError } from '@/domain/documents/errors/document-not-found';
import { FetchDocumentHistoryUseCase } from '@/domain/documents/use-cases/fetch-document-history';
import { makeDocument } from 'tests/factories/documents/entities/make-document';
import { makeDocumentHistory } from 'tests/factories/documents/entities/make-document-history';
import { makeDocumentHistoriesRepository } from 'tests/factories/documents/repositories/make-document-histories-repository';
import { makeDocumentsRepository } from 'tests/factories/documents/repositories/make-documents-repository';
import { Mock } from 'vitest';

describe('FetchDocumentHistoryUseCase', () => {
  let sut: FetchDocumentHistoryUseCase;

  const documentMock = makeDocument();
  const documentHistoryMock = makeDocumentHistory({
    documentId: documentMock.id,
  });
  const documentHistoriesRepositoryMock = makeDocumentHistoriesRepository();
  const documentsRepositoryMock = makeDocumentsRepository();

  beforeEach(() => {
    sut = new FetchDocumentHistoryUseCase(
      documentHistoriesRepositoryMock,
      documentsRepositoryMock
    );
  });

  describe('execute', () => {
    it('should list history from a document', async () => {
      (documentsRepositoryMock.findById as Mock).mockResolvedValueOnce(
        documentMock
      );
      (
        documentHistoriesRepositoryMock.findByDocumentId as Mock
      ).mockResolvedValueOnce([documentHistoryMock]);

      const result = await sut.execute({
        documentId: documentHistoryMock.documentId.value,
      });

      expect(result.documentHistory).toBeInstanceOf(Array<DocumentHistory>);
      expect(result.documentHistory).toHaveLength(1);
    });

    it('should throws error when the document does not exists', async () => {
      (documentsRepositoryMock.findById as Mock).mockResolvedValueOnce(null);

      expect(
        async () =>
          await sut.execute({
            documentId: documentHistoryMock.documentId.value,
          })
      ).rejects.toThrowError(DocumentNotFoundError);
    });
  });
});
