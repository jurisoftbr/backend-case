import { LawyersRepository } from '@/domain/auth/repositories/lawyers';
import { CreateNormalRoleLawyerUseCase } from '@/domain/auth/use-cases/create-normal-role-lawyer';
import { PrismaLawyersRepository } from '@/infra/database/repositories/prisma-lawyers-repository';
import { CreateNormalRoleLawyerController } from '@/infra/http/controllers/create-normal-role-lawyer';
import { container } from 'tsyringe';

// Repositories
container.registerSingleton<LawyersRepository>(
  'LawyersRepository',
  PrismaLawyersRepository
);

// Use cases
container.registerSingleton(
  'CreateNormalRoleLawyerUseCase',
  CreateNormalRoleLawyerUseCase
);

// Controllers
container.registerSingleton(
  'CreateNormalRoleLawyerController',
  CreateNormalRoleLawyerController
);
