import { PasswordHasherProvider } from '@/domain/auth/providers/password-hasher';
import { LawyersRepository } from '@/domain/auth/repositories/lawyers';
import { CreateNormalRoleLawyerUseCase } from '@/domain/auth/use-cases/create-normal-role-lawyer';
import { PrismaLawyersRepository } from '@/infra/database/repositories/prisma-lawyers-repository';
import { CreateNormalRoleLawyerController } from '@/infra/http/controllers/create-normal-role-lawyer';
import { BcryptPasswordHasherProvider } from '@/infra/providers/bcrypt-password-hasher';
import { container } from 'tsyringe';

// Repositories
container.registerSingleton<LawyersRepository>(
  'LawyersRepository',
  PrismaLawyersRepository
);

// Providers
container.registerSingleton<PasswordHasherProvider>(
  'PasswordHasherProvider',
  BcryptPasswordHasherProvider
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
