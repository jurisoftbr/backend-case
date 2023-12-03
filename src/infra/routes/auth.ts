import { Router } from 'express';
import { container } from 'tsyringe';
import { LoginLawyerController } from '../http/controllers/login-lawyer';

export const authRoutes = Router();

const loginLawyerController = container.resolve(LoginLawyerController);

authRoutes.post('/login', (request, response, next) =>
  loginLawyerController.handle(request, response, next)
);
