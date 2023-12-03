import { PasswordComparatorProvider } from '@/domain/auth/providers/password-comparator';
import { PasswordHasherProvider } from '@/domain/auth/providers/password-hasher';
import { TokenGeneratorProvider } from '@/domain/auth/providers/token-generator';
import { ValidTokenVerifier } from '@/domain/auth/providers/valid-token-verifier';
import { AuthLawyersRepository } from '@/domain/auth/repositories/auth-lawyers';
import { CreateNormalRoleLawyerUseCase } from '@/domain/auth/use-cases/create-normal-role-lawyer';
import { LoginLawyerUseCase } from '@/domain/auth/use-cases/login-lawyer';
import { PrismaAuthLawyersRepository } from '@/infra/database/repositories/prisma-auth-lawyers';
import { CreateLawyerController } from '@/infra/http/controllers/auth/create-lawyer';
import { LoginLawyerController } from '@/infra/http/controllers/auth/login-lawyer';
import { BcryptPasswordComparatorProvider } from '@/infra/providers/bcrypt-password-comparator';
import { BcryptPasswordHasherProvider } from '@/infra/providers/bcrypt-password-hasher';
import { JwtTokenGeneratorProvider } from '@/infra/providers/jwt-token-generator';
import { JwtValidTokenVerifier } from '@/infra/providers/jwt-valid-token-verifier';
import { container } from 'tsyringe';

// Repositories
container.registerSingleton<AuthLawyersRepository>(
  'AuthLawyersRepository',
  PrismaAuthLawyersRepository
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
container.registerSingleton<ValidTokenVerifier>(
  'ValidTokenVerifier',
  JwtValidTokenVerifier
);

// Use cases
container.registerSingleton(
  'CreateNormalRoleLawyerUseCase',
  CreateNormalRoleLawyerUseCase
);
container.registerSingleton('LoginLawyerUseCase', LoginLawyerUseCase);

// Controllers
container.registerSingleton('CreateLawyerController', CreateLawyerController);
container.registerSingleton('LoginLawyerController', LoginLawyerController);
