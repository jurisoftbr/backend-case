import { DocumentHistoryDescription } from '@/domain/documents/entities/value-objects/document-history-description';
import { makeDocument } from 'tests/factories/documents/entities/make-document';

describe('DocumentHistoryDescription', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should set text provided when instantiate', () => {
    const documentHistoryDescription = new DocumentHistoryDescription({
      text: 'document history description',
    });

    expect(documentHistoryDescription.text).toBe(
      'document history description'
    );
  });

  describe('createFromType', () => {
    const documentMock = makeDocument({
      createdAt: new Date('2023-12-05T10:31:00-03:00'),
    });

    describe('type: create', () => {
      it('should create from type create', () => {
        const description = DocumentHistoryDescription.createFromType({
          type: 'create',
          document: documentMock,
        });

        expect(description.text).toBe(
          `The document ${documentMock.title} was created on 05/12/2023, 10:31`
        );
      });
    });

    describe('type: update', () => {
      it('should create from type update', () => {
        const dateNowMock = new Date('2023-12-05T11:25:00-03:00');
        vi.setSystemTime(dateNowMock);

        const description = DocumentHistoryDescription.createFromType({
          type: 'update',
          document: documentMock,
        });

        expect(description.text).toBe(
          `The document ${documentMock.title} was updated on 05/12/2023, 11:25`
        );
      });
    });

    describe('type: updateFile', () => {
      it('should create from type update', () => {
        const dateNowMock = new Date('2023-12-05T11:25:00-03:00');
        vi.setSystemTime(dateNowMock);

        const description = DocumentHistoryDescription.createFromType({
          type: 'updateFile',
          document: documentMock,
        });

        expect(description.text).toBe(
          `The document ${documentMock.title} was updated file on 05/12/2023, 11:25`
        );
      });
    });
  });
});
