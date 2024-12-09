import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentRewardItem } from '../object/content-reward-item.object';

@Resolver()
export class ContentRewardItemsQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ContentRewardItem])
  async contentRewardItems() {
    return await this.prisma.contentRewardItem.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }
}
