import express from 'express';
import { FetchLawyerDocumentsController } from './http/controllers/fetch-lawyer-documents';
import { container } from 'tsyringe';
import { FetchDocumentByIdController } from './http/controllers/fetch-document-by-id';
import { CreateDocumentController } from './http/controllers/create-document';
import { UpdateDocumentController } from './http/controllers/update-document';

export const routes = express.Router();

const fetchLawyerDocumentsController = container.resolve(
  FetchLawyerDocumentsController
);
const fetchDocumentByIdController = container.resolve(
  FetchDocumentByIdController
);
const createDocumentController = container.resolve(CreateDocumentController);
const updateDocumentController = container.resolve(UpdateDocumentController);

routes.get('/lawyers/:lawyerId/documents', (request, response) =>
  fetchLawyerDocumentsController.handle(request, response)
);
routes.get('/lawyers/:lawyerId/documents/:documentId', (request, response) =>
  fetchDocumentByIdController.handle(request, response)
);
routes.post('/lawyers/:lawyerId/documents', (request, response) =>
  createDocumentController.handle(request, response)
);
routes.put('/lawyers/:lawyerId/documents/:documentId', (request, response) =>
  updateDocumentController.handle(request, response)
);
