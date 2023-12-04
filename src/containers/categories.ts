import { CategoriesRepository } from '@/domain/documents/repositories/categories';
import { FetchAllCategoriesUseCase } from '@/domain/documents/use-cases/fetch-all-categories';
import { PrismaCategoriesRepository } from '@/infra/database/repositories/prisma-categories';
import { FetchAllCategoriesController } from '@/infra/http/controllers/categories/fetch-all';
import { container } from 'tsyringe';

// Repositories
container.registerSingleton<CategoriesRepository>(
  'CategoriesRepository',
  PrismaCategoriesRepository
);

// Use cases
container.registerSingleton(FetchAllCategoriesUseCase);

// Controllers
container.registerSingleton(FetchAllCategoriesController);
