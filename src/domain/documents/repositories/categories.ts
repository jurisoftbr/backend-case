import { Category } from '../entities/category';

export abstract class CategoriesRepository {
  abstract findAll(): Promise<Category[]>;
}
