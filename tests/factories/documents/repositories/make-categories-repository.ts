import { CategoriesRepository } from '@/domain/documents/repositories/categories';

export function makeCategoriesRepository() {
  const categoriesRepositoryMock = {
    findAll: vi.fn(),
  } as CategoriesRepository;

  return categoriesRepositoryMock;
}
