import { Document } from '@/domain/documents/entities/document';
import { DocumentsMapper } from '@/core/mappers/documents';
import { makeDocument } from 'tests/factories/documents/entities/make-document';

describe('DocumentsMapper', () => {
  const documentMock = makeDocument();
  const documentFromDatabaseMock = {
    id: documentMock.id.value,
    title: documentMock.title,
    description: documentMock.description,
    fileUrl: documentMock.fileUrl,
    keywords: documentMock.keywords,
    lawyerId: documentMock.lawyerId.value,
    createdAt: documentMock.createdAt,
    updatedAt: documentMock.updatedAt,
  };

  describe('toDomain', () => {
    it('should return the object provided as a domain instance', () => {
      const result = DocumentsMapper.toDomain(documentFromDatabaseMock);

      expect(result).toBeInstanceOf(Document);
      expect(result).toEqual(documentMock);
    });
  });

  describe('toObject', () => {
    it('should return the document domain instance provided as an object', () => {
      const result = DocumentsMapper.toObject(documentMock);

      expect(result).toStrictEqual(documentFromDatabaseMock);
    });
  });
});
