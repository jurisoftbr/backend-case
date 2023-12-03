import { Router } from 'express';
import { FetchLawyerByIdController } from '../http/controllers/lawyers/fetch-by-id';
import { container } from 'tsyringe';

export const lawyersRoutes = Router();

const fetchLawyerByIdController = container.resolve(FetchLawyerByIdController);

lawyersRoutes.get('/me', (request, response, next) =>
  fetchLawyerByIdController.handle(request, response, next)
);
