import './documentContainer';
import './authContainer';
import { PrismaService } from '@/infra/database/prisma-service';
import { container } from 'tsyringe';

// Database
container.registerSingleton('PrismaService', PrismaService);
