import { Router } from 'express';
import { container } from 'tsyringe';
import { LoginLawyerController } from '../http/controllers/auth/login-lawyer';
import { CreateLawyerController } from '../http/controllers/auth/create-lawyer';

export const authRoutes = Router();

const loginLawyerController = container.resolve(LoginLawyerController);

const createLawyerController = container.resolve(CreateLawyerController);
authRoutes.post('/login', (request, response, next) =>
  loginLawyerController.handle(request, response, next)
);
authRoutes.post('/create-lawyer', (request, response, next) =>
  createLawyerController.handle(request, response, next)
);
