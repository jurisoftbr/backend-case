import { PrismaService } from '@/infra/database/prisma-service';
import { DocumentsRepository } from '../../../domain/documents/repositories/documents';
import { Document } from '../../../domain/documents/entities/document';
import { UniqueId } from '@/core/entities/unique-id';

export class PrismaDocumentsRepository implements DocumentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByLawyerId(lawyerId: string): Promise<Document[]> {
    const prismaDocuments = await this.prisma.document.findMany({
      where: {
        lawyerId,
      },
    });

    return prismaDocuments.map((prismaDocument) =>
      Document.create({
        title: prismaDocument.title,
        description: prismaDocument.description,
        fileUrl: prismaDocument.fileUrl,
        lawyerId: new UniqueId(prismaDocument.lawyerId),
        createdAt: prismaDocument.createdAt,
        updatedAt: prismaDocument.updatedAt,
      })
    );
  }
}
