import './documents';
import './auth';
import './lawyers';
import './categories';
import { PrismaService } from '@/infra/database/prisma-service';
import { container } from 'tsyringe';
import { EnvService } from '@/infra/env/env-service';

// Database
container.registerSingleton(PrismaService);

// Others
container.registerSingleton(EnvService);
