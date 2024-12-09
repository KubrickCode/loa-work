import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentReward } from './content-reward.object';
import { ContentRewardItem } from './content-reward-item.object';

@Resolver(() => ContentReward)
export class ContentRewardResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField(() => ContentRewardItem)
  async contentRewardItem(@Parent() contentReward: ContentReward) {
    return await this.prisma.contentRewardItem.findUniqueOrThrow({
      where: {
        id: contentReward.contentRewardItemId,
      },
    });
  }
}
