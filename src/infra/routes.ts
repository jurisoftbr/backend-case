import express from 'express';
import { FetchLawyerDocumentsController } from './http/controllers/fetch-lawyer-documents';
import { container } from 'tsyringe';
import { FetchDocumentByIdController } from './http/controllers/fetch-document-by-id';
import { CreateDocumentController } from './http/controllers/create-document';
import { UpdateDocumentController } from './http/controllers/update-document';
import { DeleteDocumentController } from './http/controllers/delete-document';
import { CreateNormalRoleLawyerController } from './http/controllers/create-normal-role-lawyer';
import { LoginLawyerController } from './http/controllers/login-lawyer';

export const routes = express.Router();

const fetchLawyerDocumentsController = container.resolve(
  FetchLawyerDocumentsController
);
const fetchDocumentByIdController = container.resolve(
  FetchDocumentByIdController
);
const createDocumentController = container.resolve(CreateDocumentController);
const updateDocumentController = container.resolve(UpdateDocumentController);
const deleteDocumentController = container.resolve(DeleteDocumentController);

const createNormalRoleLawyerController = container.resolve(
  CreateNormalRoleLawyerController
);
const loginLawyerController = container.resolve(LoginLawyerController);

routes.get('/lawyers/:lawyerId/documents', (request, response, next) =>
  fetchLawyerDocumentsController.handle(request, response, next)
);
routes.get(
  '/lawyers/:lawyerId/documents/:documentId',
  (request, response, next) =>
    fetchDocumentByIdController.handle(request, response, next)
);
routes.post('/lawyers/:lawyerId/documents', (request, response, next) =>
  createDocumentController.handle(request, response, next)
);
routes.put(
  '/lawyers/:lawyerId/documents/:documentId',
  (request, response, next) =>
    updateDocumentController.handle(request, response, next)
);
routes.delete(
  '/lawyers/:lawyerId/documents/:documentId',
  (request, response, next) =>
    deleteDocumentController.handle(request, response, next)
);

routes.post('/lawyers', (request, response, next) =>
  createNormalRoleLawyerController.handle(request, response, next)
);

routes.post('/login', (request, response, next) =>
  loginLawyerController.handle(request, response, next)
);
