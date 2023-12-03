/* eslint-disable indent */
import { AuthLawyersRepository } from '@/domain/auth/repositories/auth-lawyers';
import { PrismaService } from '../prisma-service';
import { injectable, inject } from 'tsyringe';
import { Lawyer } from '@/domain/auth/entities/lawyer';
import { LawyersMapper } from '@/core/mappers/lawyers';

@injectable()
export class PrismaAuthLawyersRepository implements AuthLawyersRepository {
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

    return LawyersMapper.toDomain(prismaLawyer);
  }
}
