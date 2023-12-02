/* eslint-disable indent */
import { DocumentLawyersRepository } from '@/domain/documents/repositories/document-lawyers';
import { PrismaService } from '../prisma-service';
import { Lawyer } from '@/domain/documents/entities/lawyer';
import { UniqueId } from '@/core/entities/unique-id';
import { injectable, inject } from 'tsyringe';

@injectable()
export class PrismaDocumentLawyersRepository
  implements DocumentLawyersRepository
{
  constructor(@inject('PrismaService') private prisma: PrismaService) {}

  async findById(id: string): Promise<Lawyer> {
    const prismaLawyer = await this.prisma.lawyer.findUnique({
      where: {
        id,
      },
    });

    if (!prismaLawyer) return null;

    return Lawyer.create({}, new UniqueId(prismaLawyer.id));
  }
}
