import './documentContainer';
import './authContainer';
import { PrismaService } from '@/infra/database/prisma-service';
import { container } from 'tsyringe';
import { EnvService } from '@/infra/env/env-service';

// Database
container.registerSingleton('PrismaService', PrismaService);

// Others
container.registerSingleton('EnvService', EnvService);
