import { UniqueId } from '@/core/entities/unique-id';
import {
  DocumentHistory,
  DocumentHistoryProps,
} from '@/domain/documents/entities/document-history';
import { DocumentHistoryDescription } from '@/domain/documents/entities/value-objects/document-history-description';
import { faker } from '@faker-js/faker';

export function makeDocumentHistory(
  override?: Partial<DocumentHistoryProps>,
  id?: UniqueId
) {
  const documentHistory = DocumentHistory.create(
    {
      description: new DocumentHistoryDescription({
        text: faker.lorem.words(),
      }),
      type: 'create',
      documentId: new UniqueId(),
      createdAt: faker.date.past(),
      ...override,
    },
    id
  );

  return documentHistory;
}
