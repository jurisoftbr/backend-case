import express from 'express';
import { documentsRoutes } from './routes/documents';
import { authRoutes } from './routes/auth';

export const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/documents', documentsRoutes);
