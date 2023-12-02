import { DocumentsRepository } from '@/domain/documents/repositories/documents';
import { LawyersRepository } from '@/domain/documents/repositories/lawyers';
import { FetchDocumentByIdUseCase } from '@/domain/documents/use-cases/fetch-document-by-id';
import { FetchLawyerDocumentsUseCase } from '@/domain/documents/use-cases/fetch-lawyer-documents';
import { PrismaService } from '@/infra/database/prisma-service';
import { PrismaDocumentsRepository } from '@/infra/database/repositories/prisma-documents-repository';
import { PrismaLawyersRepository } from '@/infra/database/repositories/prisma-lawyers-repository';
import { FetchDocumentByIdController } from '@/infra/http/controllers/fetch-document-by-id';
import { FetchLawyerDocumentsController } from '@/infra/http/controllers/fetch-lawyer-documents';
import { container } from 'tsyringe';

// Database
container.registerSingleton('PrismaService', PrismaService);
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
container.register('FetchDocumentByIdUseCase', FetchDocumentByIdUseCase);

// Controllers
container.registerSingleton(
  'FetchLawyerDocumentsController',
  FetchLawyerDocumentsController
);
container.registerSingleton(
  'FetchDocumentByIdController',
  FetchDocumentByIdController
);
