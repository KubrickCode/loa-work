import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { ContentRewardItem } from './content-reward-item.object';
import { UserContentService } from 'src/user/service/user-content.service';
import { User } from 'src/common/object/user.object';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { PrismaService } from 'src/prisma';
import { UserContentRewardItem } from './user-content-reward-item.object';

@Resolver(() => ContentRewardItem)
export class ContentRewardItemResolver {
  constructor(
    private userContentService: UserContentService,
    private prisma: PrismaService,
  ) {}

  @ResolveField(() => Float)
  async price(@Parent() contentRewardItem: ContentRewardItem) {
    return await this.userContentService.getContentRewardItemPrice(
      contentRewardItem.id,
    );
  }

  @ResolveField(() => UserContentRewardItem)
  async userContentRewardItem(
    @Parent() contentRewardItem: ContentRewardItem,
    @CurrentUser() user?: User,
  ) {
    if (!user) throw new Error('User is not logged in');

    return await this.prisma.userContentRewardItem.findUniqueOrThrow({
      where: {
        userId_contentRewardItemId: {
          userId: user.id,
          contentRewardItemId: contentRewardItem.id,
        },
      },
    });
  }
}
