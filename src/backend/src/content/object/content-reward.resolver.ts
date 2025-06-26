import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentReward } from './content-reward.object';
import { ContentRewardItem } from './content-reward-item.object';
import { UserContentService } from '../../user/service/user-content.service';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';
import { UserContentReward } from './user-content-reward.object';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DataLoaderService } from 'src/dataloader/data-loader.service';

@Resolver(() => ContentReward)
export class ContentRewardResolver {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
    private dataLoaderService: DataLoaderService,
  ) {}

  @ResolveField(() => ContentRewardItem)
  async contentRewardItem(@Parent() contentReward: ContentReward) {
    return await this.dataLoaderService.contentRewardItem.findUniqueOrThrowById(
      contentReward.contentRewardItemId,
    );
  }

  @ResolveField(() => Float)
  async averageQuantity(@Parent() contentReward: ContentReward) {
    return await this.userContentService.getContentRewardAverageQuantity(
      contentReward.id,
    );
  }

  @ResolveField(() => Boolean)
  async isSellable(@Parent() contentReward: ContentReward) {
    return await this.userContentService.getContentRewardIsSellable(
      contentReward.id,
    );
  }

  @UseGuards(AuthGuard)
  @ResolveField(() => UserContentReward)
  async userContentReward(
    @Parent() contentReward: ContentReward,
    @CurrentUser() user: User,
  ) {
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
