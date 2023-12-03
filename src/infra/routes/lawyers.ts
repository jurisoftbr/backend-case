import { Router } from 'express';
import { CreateNormalRoleLawyerController } from '../http/controllers/create-normal-role-lawyer';
import { container } from 'tsyringe';

export const lawyersRoutes = Router();

const createNormalRoleLawyerController = container.resolve(
  CreateNormalRoleLawyerController
);

lawyersRoutes.post('/lawyers', (request, response, next) =>
  createNormalRoleLawyerController.handle(request, response, next)
);
