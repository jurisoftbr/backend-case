import express from 'express';
import { FetchLawyerDocumentsController } from './http/controllers/fetch-lawyer-documents';
import { container } from 'tsyringe';
import { FetchDocumentByIdController } from './http/controllers/fetch-document-by-id';

export const routes = express.Router();

const fetchLawyerDocumentsController = container.resolve(
  FetchLawyerDocumentsController
);

const fetchDocumentByIdController = container.resolve(
  FetchDocumentByIdController
);

routes.get('/lawyers/:lawyerId/documents', (request, response) =>
  fetchLawyerDocumentsController.handle(request, response)
);

routes.get('/lawyers/:lawyerId/documents/:documentId', (request, response) =>
  fetchDocumentByIdController.handle(request, response)
);
