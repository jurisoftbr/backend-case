import { Router } from 'express';
import { container } from 'tsyringe';
import { CreateDocumentController } from '../http/controllers/create-document';
import { DeleteDocumentController } from '../http/controllers/delete-document';
import { FetchDocumentByIdController } from '../http/controllers/fetch-document-by-id';
import { FetchLawyerDocumentsController } from '../http/controllers/fetch-lawyer-documents';
import { UpdateDocumentController } from '../http/controllers/update-document';

export const documentsRoutes = Router();

const fetchLawyerDocumentsController = container.resolve(
  FetchLawyerDocumentsController
);
const fetchDocumentByIdController = container.resolve(
  FetchDocumentByIdController
);
const createDocumentController = container.resolve(CreateDocumentController);
const updateDocumentController = container.resolve(UpdateDocumentController);
const deleteDocumentController = container.resolve(DeleteDocumentController);

documentsRoutes.get('/', (request, response, next) =>
  fetchLawyerDocumentsController.handle(request, response, next)
);
documentsRoutes.get('/:documentId', (request, response, next) =>
  fetchDocumentByIdController.handle(request, response, next)
);
documentsRoutes.post('/', (request, response, next) =>
  createDocumentController.handle(request, response, next)
);
documentsRoutes.put('/:documentId', (request, response, next) =>
  updateDocumentController.handle(request, response, next)
);
documentsRoutes.delete('/:documentId', (request, response, next) =>
  deleteDocumentController.handle(request, response, next)
);
