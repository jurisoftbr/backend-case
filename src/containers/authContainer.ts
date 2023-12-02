import { PasswordComparatorProvider } from '@/domain/auth/providers/password-comparator';
import { PasswordHasherProvider } from '@/domain/auth/providers/password-hasher';
import { TokenGeneratorProvider } from '@/domain/auth/providers/token-generator';
import { LawyersRepository } from '@/domain/auth/repositories/lawyers';
import { CreateNormalRoleLawyerUseCase } from '@/domain/auth/use-cases/create-normal-role-lawyer';
import { LoginLawyerUseCase } from '@/domain/auth/use-cases/login-lawyer';
import { PrismaLawyersRepository } from '@/infra/database/repositories/prisma-lawyers-repository';
import { CreateNormalRoleLawyerController } from '@/infra/http/controllers/create-normal-role-lawyer';
import { LoginLawyerController } from '@/infra/http/controllers/login-lawyer';
import { BcryptPasswordComparatorProvider } from '@/infra/providers/bcrypt-password-comparator';
import { BcryptPasswordHasherProvider } from '@/infra/providers/bcrypt-password-hasher';
import { JwtTokenGeneratorProvider } from '@/infra/providers/jwt-token-generator';
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
container.registerSingleton<TokenGeneratorProvider>(
  'TokenGeneratorProvider',
  JwtTokenGeneratorProvider
);
container.registerSingleton<PasswordComparatorProvider>(
  'PasswordComparatorProvider',
  BcryptPasswordComparatorProvider
);

// Use cases
container.registerSingleton(
  'CreateNormalRoleLawyerUseCase',
  CreateNormalRoleLawyerUseCase
);
container.registerSingleton('LoginLawyerUseCase', LoginLawyerUseCase);

// Controllers
container.registerSingleton(
  'CreateNormalRoleLawyerController',
  CreateNormalRoleLawyerController
);
container.registerSingleton('LoginLawyerController', LoginLawyerController);
