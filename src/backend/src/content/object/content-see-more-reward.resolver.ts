import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ContentRewardItem } from './content-reward-item.object';
import { ContentSeeMoreReward } from './content-see-more-reward.object';
import { DataLoaderService } from 'src/dataloader/data-loader.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserContentSeeMoreReward } from './user-content-see-more-reward.object';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { UserContentService } from 'src/user/service/user-content.service';

@Resolver(() => ContentSeeMoreReward)
export class ContentSeeMoreRewardResolver {
  constructor(
    private dataLoaderService: DataLoaderService,
    private prisma: PrismaService,
    private userContentService: UserContentService,
  ) {}

  @ResolveField(() => ContentRewardItem)
  async contentRewardItem(
    @Parent() contentSeeMoreReward: ContentSeeMoreReward,
  ) {
    return await this.dataLoaderService.contentRewardItem.findUniqueOrThrowById(
      contentSeeMoreReward.contentRewardItemId,
    );
  }

  @ResolveField(() => Float)
  async quantity(@Parent() contentSeeMoreReward: ContentSeeMoreReward) {
    return await this.userContentService.getContentSeeMoreRewardQuantity(
      contentSeeMoreReward.id,
    );
  }

  @UseGuards(AuthGuard)
  @ResolveField(() => UserContentSeeMoreReward)
  async userContentSeeMoreReward(
    @Parent() contentSeeMoreReward: ContentSeeMoreReward,
    @CurrentUser() user: User,
  ) {
    return await this.prisma.userContentSeeMoreReward.findUniqueOrThrow({
      where: {
        userId_contentSeeMoreRewardId: {
          userId: user.id,
          contentSeeMoreRewardId: contentSeeMoreReward.id,
        },
      },
    });
  }
}
