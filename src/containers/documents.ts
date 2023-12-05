import { DocumentsRepository } from '@/domain/documents/repositories/documents';
import { DocumentLawyersRepository } from '@/domain/documents/repositories/document-lawyers';
import { CreateDocumentUseCase } from '@/domain/documents/use-cases/create-document';
import { DeleteDocumentUseCase } from '@/domain/documents/use-cases/delete-document';
import { FetchDocumentByIdUseCase } from '@/domain/documents/use-cases/fetch-document-by-id';
import { FetchLawyerDocumentsUseCase } from '@/domain/documents/use-cases/fetch-lawyer-documents';
import { UpdateDocumentUseCase } from '@/domain/documents/use-cases/update-document';
import { PrismaDocumentsRepository } from '@/infra/database/repositories/prisma-documents';
import { PrismaDocumentLawyersRepository } from '@/infra/database/repositories/prisma-document-lawyers';
import { CreateDocumentController } from '@/infra/http/controllers/documents/create';
import { DeleteDocumentController } from '@/infra/http/controllers/documents/delete';
import { FetchDocumentByIdController } from '@/infra/http/controllers/documents/fetch-by-id';
import { FetchLawyerDocumentsController } from '@/infra/http/controllers/documents/fetch-by-lawyer';
import { UpdateDocumentController } from '@/infra/http/controllers/documents/update';
import { container } from 'tsyringe';
import { UpdateDocumentFileUrlUseCase } from '@/domain/documents/use-cases/update-document-file-url';
import { UploadDocumentController } from '@/infra/http/controllers/documents/upload';
import { DeleteDocumentFileProvider } from '@/domain/documents/providers/delete-document-file';
import { FsDeleteDocumentFileProvider } from '@/infra/providers/fs-delete-document-file';
import { DocumentHistoriesRepository } from '@/domain/documents/repositories/document-histories';
import { PrismaDocumentHistoriesRepository } from '@/infra/database/repositories/prisma-document-histories';
import { FetchDocumentHistoryUseCase } from '@/domain/documents/use-cases/fetch-document-history';
import { FetchDocumentHistoryController } from '@/infra/http/controllers/documents/fetch-history';

// Repositories
container.registerSingleton<DocumentsRepository>(
  'DocumentsRepository',
  PrismaDocumentsRepository
);
container.registerSingleton<DocumentLawyersRepository>(
  'DocumentLawyersRepository',
  PrismaDocumentLawyersRepository
);
container.registerSingleton<DocumentHistoriesRepository>(
  'DocumentHistoriesRepository',
  PrismaDocumentHistoriesRepository
);

// Providers
container.registerSingleton<DeleteDocumentFileProvider>(
  'DeleteDocumentFileProvider',
  FsDeleteDocumentFileProvider
);

// Use cases
container.registerSingleton(FetchLawyerDocumentsUseCase);
container.registerSingleton(FetchDocumentByIdUseCase);
container.registerSingleton(CreateDocumentUseCase);
container.registerSingleton(UpdateDocumentUseCase);
container.registerSingleton(DeleteDocumentUseCase);
container.registerSingleton(UpdateDocumentFileUrlUseCase);
container.registerSingleton(FetchDocumentHistoryUseCase);

// Controllers
container.registerSingleton(FetchLawyerDocumentsController);
container.registerSingleton(FetchDocumentByIdController);
container.registerSingleton(CreateDocumentController);
container.registerSingleton(UpdateDocumentController);
container.registerSingleton(DeleteDocumentController);
container.registerSingleton(UploadDocumentController);
container.registerSingleton(FetchDocumentHistoryController);
