/* eslint-disable indent */
import { LawyersRepository } from '@/domain/auth/repositories/lawyers';
import { PrismaService } from '../prisma-service';
import { UniqueId } from '@/core/entities/unique-id';
import { injectable, inject } from 'tsyringe';
import { Lawyer } from '@/domain/auth/entities/lawyer';

@injectable()
export class PrismaLawyersRepository implements LawyersRepository {
  constructor(@inject('PrismaService') private prisma: PrismaService) {}

  async create(lawyer: Lawyer): Promise<void> {
    await this.prisma.lawyer.create({
      data: {
        id: lawyer.id.value,
        name: lawyer.name,
        email: lawyer.email,
        password: lawyer.password,
        role: lawyer.role,
      },
    });
  }

  async findByEmail(email: string): Promise<Lawyer | null> {
    const prismaLawyer = await this.prisma.lawyer.findUnique({
      where: {
        email,
      },
    });

    if (!prismaLawyer) return null;

    return Lawyer.create(
      {
        name: prismaLawyer.name,
        email: prismaLawyer.email,
        password: prismaLawyer.password,
        role: prismaLawyer.role,
        createdAt: prismaLawyer.createdAt,
        updatedAt: prismaLawyer.updatedAt,
      },
      new UniqueId(prismaLawyer.id)
    );
  }
}
