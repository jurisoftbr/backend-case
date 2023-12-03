import { LawyersRepository } from '@/domain/lawyers/repositories/lawyers';
import { inject, injectable } from 'tsyringe';
import { PrismaService } from '../prisma-service';
import { Lawyer } from '@/domain/lawyers/entities/lawyer';
import { LawyersMapper } from '@/core/mappers/lawyers';

@injectable()
export class PrismaLawyersRepository implements LawyersRepository {
  constructor(@inject('PrismaService') private prisma: PrismaService) {}

  async findById(id: string): Promise<Lawyer | null> {
    const prismaLawyer = await this.prisma.lawyer.findUnique({
      where: {
        id,
      },
    });

    if (!prismaLawyer) return null;

    return LawyersMapper.toDomain(prismaLawyer);
  }
}
