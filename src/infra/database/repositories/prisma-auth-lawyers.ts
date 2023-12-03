/* eslint-disable indent */
import { AuthLawyersRepository } from '@/domain/auth/repositories/auth-lawyers';
import { PrismaService } from '../prisma-service';
import { injectable, inject } from 'tsyringe';
import { AuthLawyer } from '@/domain/auth/entities/auth-lawyer';
import { AuthLawyersMapper } from '@/core/mappers/auth-lawyers';

@injectable()
export class PrismaAuthLawyersRepository implements AuthLawyersRepository {
  constructor(@inject(PrismaService) private prisma: PrismaService) {}

  async create(lawyer: AuthLawyer): Promise<void> {
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

  async findByEmail(email: string): Promise<AuthLawyer | null> {
    const prismaLawyer = await this.prisma.lawyer.findUnique({
      where: {
        email,
      },
    });

    if (!prismaLawyer) return null;

    return AuthLawyersMapper.toDomain(prismaLawyer);
  }
}
