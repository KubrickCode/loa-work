import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentCategory } from '../object/content-category.object';

@Resolver()
export class ContentCategoriesQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ContentCategory])
  async contentCategories() {
    return await this.prisma.contentCategory.findMany();
  }
}
