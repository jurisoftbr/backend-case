import { FetchAllCategoriesUseCase } from '@/domain/documents/use-cases/fetch-all-categories';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FetchAllCategoriesController {
  constructor(
    @inject(FetchAllCategoriesUseCase)
    private fetchAllCategoriesUseCase: FetchAllCategoriesUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { categories } = await this.fetchAllCategoriesUseCase.execute();

      const parsedCategories = categories.map((category) => ({
        id: category.id.value,
        name: category.name,
      }));

      return response.json({ categories: parsedCategories });
    } catch (error) {
      next(error);
    }
  }
}
