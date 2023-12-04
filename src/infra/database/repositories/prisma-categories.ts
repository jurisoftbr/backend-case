import { CategoriesRepository } from '@/domain/documents/repositories/categories';
import { PrismaService } from '../prisma-service';
import { inject, injectable } from 'tsyringe';
import { Category } from '@/domain/documents/entities/category';
import { UniqueId } from '@/core/entities/unique-id';

@injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(@inject(PrismaService) private prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    const prismaCategories = await this.prisma.category.findMany();

    return prismaCategories.map((prismaCategory) =>
      Category.create(
        {
          name: prismaCategory.name,
          createdAt: prismaCategory.createdAt,
          updatedAt: prismaCategory.updatedAt,
        },
        new UniqueId(prismaCategory.id)
      )
    );
  }
}
