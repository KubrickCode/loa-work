import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentRewardItem } from './content-reward-item.object';
import { ContentSeeMoreReward } from './content-see-more-reward.object';

@Resolver(() => ContentSeeMoreReward)
export class ContentSeeMoreRewardResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField(() => ContentRewardItem)
  async contentRewardItem(
    @Parent() contentSeeMoreReward: ContentSeeMoreReward,
  ) {
    return await this.prisma.contentRewardItem.findUniqueOrThrow({
      where: {
        id: contentSeeMoreReward.contentRewardItemId,
      },
    });
  }
}
