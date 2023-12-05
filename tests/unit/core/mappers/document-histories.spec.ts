import { DocumentHistoriesMapper } from '@/core/mappers/document-histories';
import { DocumentHistory } from '@/domain/documents/entities/document-history';
import { makeDocumentHistory } from 'tests/factories/documents/entities/make-document-history';

describe('DocumentHistoriesMapper', () => {
  const documentHistoryMock = makeDocumentHistory();
  const documentFromDatabaseMock = {
    id: documentHistoryMock.id.value,
    description: documentHistoryMock.description.text,
    type: documentHistoryMock.type,
    documentId: documentHistoryMock.documentId.value,
    createdAt: documentHistoryMock.createdAt,
  };

  describe('toDomain', () => {
    it('should return the object provided as a domain instance', () => {
      const result = DocumentHistoriesMapper.toDomain(documentFromDatabaseMock);

      expect(result).toBeInstanceOf(DocumentHistory);
      expect(result).toEqual(documentHistoryMock);
    });
  });

  describe('toObject', () => {
    it('should return the lawyer domain instance provided as an object', () => {
      const result = DocumentHistoriesMapper.toObject(documentHistoryMock);

      expect(result).toStrictEqual(documentFromDatabaseMock);
    });
  });
});
