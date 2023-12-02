import { DocumentsRepository } from '@/domain/documents/repositories/documents';
import { LawyersRepository } from '@/domain/documents/repositories/lawyers';
import { FetchLawyerDocumentsUseCase } from '@/domain/documents/use-cases/fetch-lawyer-documents';
import { PrismaService } from '@/infra/database/prisma-service';
import { PrismaDocumentsRepository } from '@/infra/database/repositories/prisma-documents-repository';
import { PrismaLawyersRepository } from '@/infra/database/repositories/prisma-lawyers-repository';
import { FetchLawyerDocumentsController } from '@/infra/http/controllers/fetch-lawyer-documents';
import { container } from 'tsyringe';

container.registerSingleton('PrismaService', PrismaService);
container.registerSingleton<DocumentsRepository>(
  'DocumentsRepository',
  PrismaDocumentsRepository
);
container.registerSingleton<LawyersRepository>(
  'LawyersRepository',
  PrismaLawyersRepository
);
container.registerSingleton(
  'FetchLawyerDocumentsUseCase',
  FetchLawyerDocumentsUseCase
);
container.registerSingleton(
  'FetchLawyerDocumentsController',
  FetchLawyerDocumentsController
);
