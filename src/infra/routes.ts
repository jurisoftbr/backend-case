import express from 'express';
import { container } from 'tsyringe';
import { CreateNormalRoleLawyerController } from './http/controllers/create-normal-role-lawyer';
import { LoginLawyerController } from './http/controllers/login-lawyer';
import { documentsRoutes } from './routes/documents';

export const routes = express.Router();

const createNormalRoleLawyerController = container.resolve(
  CreateNormalRoleLawyerController
);
const loginLawyerController = container.resolve(LoginLawyerController);

routes.use('/documents', documentsRoutes);

routes.post('/lawyers', (request, response, next) =>
  createNormalRoleLawyerController.handle(request, response, next)
);

routes.post('/login', (request, response, next) =>
  loginLawyerController.handle(request, response, next)
);
