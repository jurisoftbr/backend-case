/* eslint-disable indent */
import { DocumentHistoriesRepository } from '@/domain/documents/repositories/document-histories';
import { injectable, inject } from 'tsyringe';
import { PrismaService } from '../prisma-service';
import { DocumentHistory } from '@/domain/documents/entities/document-history';
import { UniqueId } from '@/core/entities/unique-id';
import { DocumentHistoryDescription } from '@/domain/documents/entities/value-objects/document-history-description';

@injectable()
export class PrismaDocumentHistoriesRepository
  implements DocumentHistoriesRepository
{
  constructor(@inject(PrismaService) private prisma: PrismaService) {}

  async create(documentHistory: DocumentHistory): Promise<void> {
    await this.prisma.documentHistory.create({
      data: {
        id: documentHistory.id.value,
        description: documentHistory.description.text,
        type: documentHistory.type,
        documentId: documentHistory.documentId.value,
      },
    });
  }

  async findByDocumentId(documentId: string): Promise<DocumentHistory[]> {
    const prismaDocumentHistories = await this.prisma.documentHistory.findMany({
      where: {
        documentId,
      },
    });

    return prismaDocumentHistories.map((documentHistory) =>
      DocumentHistory.create(
        {
          description: new DocumentHistoryDescription({
            text: documentHistory.description,
          }),
          type: documentHistory.type,
          documentId: new UniqueId(documentHistory.documentId),
          createdAt: documentHistory.createdAt,
        },
        new UniqueId(documentHistory.id)
      )
    );
  }
}
