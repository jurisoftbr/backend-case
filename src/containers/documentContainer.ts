import { DocumentsRepository } from '@/domain/documents/repositories/documents';
import { LawyersRepository } from '@/domain/documents/repositories/lawyers';
import { CreateDocumentUseCase } from '@/domain/documents/use-cases/create-document';
import { DeleteDocumentUseCase } from '@/domain/documents/use-cases/delete-document';
import { FetchDocumentByIdUseCase } from '@/domain/documents/use-cases/fetch-document-by-id';
import { FetchLawyerDocumentsUseCase } from '@/domain/documents/use-cases/fetch-lawyer-documents';
import { UpdateDocumentUseCase } from '@/domain/documents/use-cases/update-document';
import { PrismaDocumentsRepository } from '@/infra/database/repositories/prisma-documents-repository';
import { PrismaLawyersRepository } from '@/infra/database/repositories/prisma-lawyers-repository';
import { CreateDocumentController } from '@/infra/http/controllers/create-document';
import { DeleteDocumentController } from '@/infra/http/controllers/delete-document';
import { FetchDocumentByIdController } from '@/infra/http/controllers/fetch-document-by-id';
import { FetchLawyerDocumentsController } from '@/infra/http/controllers/fetch-lawyer-documents';
import { UpdateDocumentController } from '@/infra/http/controllers/update-document';
import { container } from 'tsyringe';

// Repositories
container.registerSingleton<DocumentsRepository>(
  'DocumentsRepository',
  PrismaDocumentsRepository
);
container.registerSingleton<LawyersRepository>(
  'LawyersRepository',
  PrismaLawyersRepository
);

// Use cases
container.registerSingleton(
  'FetchLawyerDocumentsUseCase',
  FetchLawyerDocumentsUseCase
);
container.registerSingleton(
  'FetchDocumentByIdUseCase',
  FetchDocumentByIdUseCase
);
container.registerSingleton('CreateDocumentUseCase', CreateDocumentUseCase);
container.registerSingleton('UpdateDocumentUseCase', UpdateDocumentUseCase);
container.registerSingleton('DeleteDocumentUseCase', DeleteDocumentUseCase);

// Controllers
container.registerSingleton(
  'FetchLawyerDocumentsController',
  FetchLawyerDocumentsController
);
container.registerSingleton(
  'FetchDocumentByIdController',
  FetchDocumentByIdController
);
container.registerSingleton(
  'CreateDocumentController',
  CreateDocumentController
);
container.registerSingleton(
  'UpdateDocumentController',
  UpdateDocumentController
);
container.registerSingleton(
  'DeleteDocumentController',
  DeleteDocumentController
);
