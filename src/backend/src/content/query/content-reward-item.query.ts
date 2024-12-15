import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentRewardItem } from '../object/content-reward-item.object';

@Resolver()
export class ContentRewardItemQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => ContentRewardItem)
  async contentRewardItem(@Args('id', { type: () => Int }) id: number) {
    return await this.prisma.contentRewardItem.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
