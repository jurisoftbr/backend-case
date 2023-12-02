import { PrismaService } from '@/infra/database/prisma-service';
import { DocumentsRepository } from '../../../domain/documents/repositories/documents';
import { Document } from '../../../domain/documents/entities/document';
import { DocumentsMapper } from '../../../core/mappers/documents';

export class PrismaDocumentsRepository implements DocumentsRepository {
  constructor(private prisma: PrismaService) {}

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
}
