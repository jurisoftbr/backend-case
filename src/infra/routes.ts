import express from 'express';
import { documentsRoutes } from './routes/documents';
import { authRoutes } from './routes/auth';
import { lawyersRoutes } from './routes/lawyers';

export const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/documents', documentsRoutes);
routes.use('/lawyers', lawyersRoutes);
