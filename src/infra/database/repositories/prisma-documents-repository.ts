import { PrismaService } from '@/infra/database/prisma-service';
import { DocumentsRepository } from '../../../domain/documents/repositories/documents';
import { Document } from '../../../domain/documents/entities/document';
import { DocumentsMapper } from '../../../core/mappers/documents';
import { injectable, inject } from 'tsyringe';

@injectable()
export class PrismaDocumentsRepository implements DocumentsRepository {
  constructor(@inject('PrismaService') private prisma: PrismaService) {}

  async findByLawyerId(lawyerId: string): Promise<Document[]> {
    const prismaDocuments = await this.prisma.document.findMany({
      where: {
        lawyerId,
      },
    });

    return prismaDocuments.map((prismaDocument) =>
      DocumentsMapper.toDomain(prismaDocument)
    );
  }

  async findById(id: string): Promise<Document | null> {
    const prismaDocument = await this.prisma.document.findUnique({
      where: {
        id,
      },
    });

    return prismaDocument ? DocumentsMapper.toDomain(prismaDocument) : null;
  }
}
