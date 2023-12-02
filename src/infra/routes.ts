import express from 'express';
import { FetchLawyerDocumentsController } from './http/controllers/fetch-lawyer-documents';
import { container } from 'tsyringe';

export const routes = express.Router();

const fetchLawyerDocumentsController = container.resolve(
  FetchLawyerDocumentsController
);

routes.get('/lawyers/:lawyerId/documents', (request, response) =>
  fetchLawyerDocumentsController.handle(request, response)
);
