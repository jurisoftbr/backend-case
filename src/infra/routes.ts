import express from 'express';
import { FetchLawyerDocumentsController } from './http/controllers/fetch-lawyer-documents';
import { PrismaService } from './database/prisma-service';
import { PrismaDocumentsRepository } from '@/infra/database/repositories/prisma-documents-repository';
import { PrismaLawyersRepository } from '@/infra/database/repositories/prisma-lawyers-repository';
import { FetchLawyerDocumentsUseCase } from '@/domain/documents/use-cases/fetch-lawyer-documents';

export const routes = express.Router();

const prismaService = new PrismaService();
const documentsRepository = new PrismaDocumentsRepository(prismaService);
const lawyersRepository = new PrismaLawyersRepository(prismaService);
const fetchLawyerDocumentsUseCase = new FetchLawyerDocumentsUseCase(
  documentsRepository,
  lawyersRepository
);

routes.get('/lawyers/:lawyerId/documents', (request, response) =>
  new FetchLawyerDocumentsController(fetchLawyerDocumentsUseCase).handle(
    request,
    response
  )
);
