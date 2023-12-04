import { Category } from '@/domain/documents/entities/category';
import { FetchAllCategoriesUseCase } from '@/domain/documents/use-cases/fetch-all-categories';
import { makeCategory } from 'tests/factories/documents/entities/make-category';
import { makeCategoriesRepository } from 'tests/factories/documents/repositories/make-categories-repository';
import { Mock } from 'vitest';

describe('FetchAllCategoriesUseCase', () => {
  let sut: FetchAllCategoriesUseCase;

  const categoriesRepositoryMock = makeCategoriesRepository();
  (categoriesRepositoryMock.findAll as Mock).mockResolvedValue([
    makeCategory(),
    makeCategory(),
  ]);

  beforeEach(() => {
    sut = new FetchAllCategoriesUseCase(categoriesRepositoryMock);
  });

  describe('execute', () => {
    it('should return all categories', async () => {
      const result = await sut.execute();

      expect(categoriesRepositoryMock.findAll).toHaveBeenCalledOnce();
      expect(result.categories).toBeInstanceOf(Array<Category>);
      expect(result.categories).toHaveLength(2);
    });
  });
});
