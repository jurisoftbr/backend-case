import { Category } from '../entities/category';
import { CategoriesRepository } from '../repositories/categories';

interface FetchAllCategoriesUseCaseResponse {
  categories: Category[];
}

export class FetchAllCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<FetchAllCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.findAll();

    return { categories };
  }
}
