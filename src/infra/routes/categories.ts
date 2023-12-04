import { Router } from 'express';
import { container } from 'tsyringe';
import { FetchAllCategoriesController } from '../http/controllers/categories/fetch-all';

export const categoriesRoutes = Router();

const fetchAllCategoriesController = container.resolve(
  FetchAllCategoriesController
);

categoriesRoutes.get('/', (request, response, next) =>
  fetchAllCategoriesController.handle(request, response, next)
);
