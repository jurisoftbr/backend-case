import { DocumentHistoryDescription } from '@/domain/documents/entities/value-objects/document-history-description';
import { makeDocument } from 'tests/factories/documents/entities/make-document';

describe('DocumentHistoryDescription', () => {
  describe('text', () => {
    const documentMock = makeDocument({
      createdAt: new Date('2023-12-05T10:31:00-03:00'),
    });

    it('should create text when it is not provided', () => {
      const description = new DocumentHistoryDescription({
        type: 'create',
        document: documentMock,
      });

      expect(description.text).toBe(
        `The document ${documentMock.title} was created on 05/12/2023 at 10:31`
      );
    });

    it('should return text when it is provided', () => {
      const description = new DocumentHistoryDescription({
        type: 'create',
        document: documentMock,
        text: `The document ${documentMock.title} was created on 05/12/2023 at 10:31`,
      });

      expect(description.text).toBe(
        `The document ${documentMock.title} was created on 05/12/2023 at 10:31`
      );
    });
  });
});
