import { inject, injectable } from 'tsyringe';
import { Category } from '../entities/category';
import { CategoriesRepository } from '../repositories/categories';

interface FetchAllCategoriesUseCaseResponse {
  categories: Category[];
}

@injectable()
export class FetchAllCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute(): Promise<FetchAllCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.findAll();

    return { categories };
  }
}
