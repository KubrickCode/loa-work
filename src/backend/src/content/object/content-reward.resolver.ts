import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentReward } from './content-reward.object';
import { ContentRewardItem } from './content-reward-item.object';
import { UserContentService } from '../service/user-content.service';

@Resolver(() => ContentReward)
export class ContentRewardResolver {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
  ) {}

  @ResolveField(() => ContentRewardItem)
  async contentRewardItem(@Parent() contentReward: ContentReward) {
    return await this.prisma.contentRewardItem.findUniqueOrThrow({
      where: {
        id: contentReward.contentRewardItemId,
      },
    });
  }

  @ResolveField(() => Float)
  async averageQuantity(@Parent() contentReward: ContentReward) {
    return await this.userContentService.getContentRewardAverageQuantity(
      contentReward.id,
    );
  }
}
