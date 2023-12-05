import { PrismaService } from '@/infra/database/prisma-service';
import { DocumentsRepository } from '../../../domain/documents/repositories/documents';
import { Document } from '../../../domain/documents/entities/document';
import { DocumentsMapper } from '../../../core/mappers/documents';
import { injectable, inject } from 'tsyringe';

@injectable()
export class PrismaDocumentsRepository implements DocumentsRepository {
  constructor(@inject(PrismaService) private prisma: PrismaService) {}

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

  async create(document: Document): Promise<void> {
    await this.prisma.document.create({
      data: {
        id: document.id.value,
        title: document.title,
        description: document.description,
        version: document.version,
        keywords: document.keywords,
        lawyerId: document.lawyerId.value,
        categoryId: document.categoryId.value,
      },
    });
  }

  async update(document: Document): Promise<void> {
    await this.prisma.document.update({
      where: {
        id: document.id.value,
      },
      data: {
        title: document.title,
        description: document.description,
        version: document.version,
        fileName: document.fileName,
        fileUrl: document.fileUrl,
        keywords: document.keywords,
      },
    });
  }

  async updateFile(
    id: string,
    fileName: string,
    fileUrl: string
  ): Promise<void> {
    await this.prisma.document.update({
      where: {
        id,
      },
      data: {
        fileName,
        fileUrl,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.document.delete({
      where: {
        id,
      },
    });
  }
}
