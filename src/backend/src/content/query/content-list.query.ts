import { Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from 'src/prisma';
import { Content } from '../object/content.object';

@Resolver()
export class ContentListQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Content])
  async contentList() {
    return await this.prisma.content.findMany();
  }
}
