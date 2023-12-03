import { UniqueId } from '@/core/entities/unique-id';
import { Document, DocumentProps } from '@/domain/documents/entities/document';
import { faker } from '@faker-js/faker';

export function makeDocument(override?: Partial<DocumentProps>, id?: UniqueId) {
  return Document.create(
    {
      title: faker.lorem.words(),
      description: faker.lorem.sentences(),
      fileUrl: faker.internet.url(),
      keywords: [faker.lorem.word(), faker.lorem.word()],
      lawyerId: new UniqueId(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      ...override,
    },
    id
  );
}
