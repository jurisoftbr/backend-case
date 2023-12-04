import { UniqueId } from '@/core/entities/unique-id';
import { Category } from '@/domain/documents/entities/category';
import { faker } from '@faker-js/faker';

export function makeCategory(override?: Partial<Category>, id?: UniqueId) {
  return Category.create(
    {
      name: faker.lorem.word(),
      ...override,
    },
    id
  );
}
