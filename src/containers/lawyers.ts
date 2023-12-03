import { LawyersRepository } from '@/domain/lawyers/repositories/lawyers';
import { FetchLawyerByIdUseCase } from '@/domain/lawyers/use-cases/fetch-lawyer-by-id';
import { PrismaLawyersRepository } from '@/infra/database/repositories/prisma-lawyers';
import { FetchLawyerByIdController } from '@/infra/http/controllers/lawyers/fetch-by-id';
import { container } from 'tsyringe';

// Repositories
container.registerSingleton<LawyersRepository>(
  'LawyersRepository',
  PrismaLawyersRepository
);

// Use cases
container.registerSingleton(FetchLawyerByIdUseCase);

// Controllers
container.registerSingleton(FetchLawyerByIdController);
