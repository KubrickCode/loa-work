import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentReward } from './content-reward.object';
import { ContentRewardItem } from './content-reward-item.object';
import { UserContentService } from '../service/user-content.service';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';
import { UserContentReward } from './user-content-reward.object';

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

  @ResolveField(() => UserContentReward)
  async userContentReward(
    @Parent() contentReward: ContentReward,
    @CurrentUser() user?: User,
  ) {
    if (!user) throw new Error('User is not logged in');

    return await this.prisma.userContentReward.findUniqueOrThrow({
      where: {
        userId_contentRewardId: {
          userId: user.id,
          contentRewardId: contentReward.id,
        },
      },
    });
  }
}
