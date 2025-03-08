import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { ContentRewardItem } from './content-reward-item.object';
import { UserContentService } from 'src/user/service/user-content.service';
import { User } from 'src/common/object/user.object';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { PrismaService } from 'src/prisma';
import { UserContentRewardItem } from './user-content-reward-item.object';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => ContentRewardItem)
export class ContentRewardItemResolver {
  constructor(
    private userContentService: UserContentService,
    private prisma: PrismaService,
  ) {}

  @ResolveField(() => String)
  async pieColor(@Parent() contentRewardItem: ContentRewardItem) {
    const colorMap: Record<string, string> = {
      골드: '#FFD700', // 금색
      '운명의 파편': '#8A2BE2', // 보라색
      '운명의 돌파석': '#9370DB', // 연한 보라색
      '운명의 파괴석': '#DC143C', // 진한 빨간색 (Crimson)
      '운명의 수호석': '#4169E1', // 로얄 블루
      '1레벨 보석': '#E60073', // 핑크색
      '용암의 숨결': '#FF4500', // 붉은 오렌지색
      '빙하의 숨결': '#1E90FF', // 밝은 파란색
    };

    return colorMap[contentRewardItem.name] || '#8884d8';
  }

  @ResolveField(() => Float)
  async price(@Parent() contentRewardItem: ContentRewardItem) {
    return await this.userContentService.getContentRewardItemPrice(
      contentRewardItem.id,
    );
  }

  @UseGuards(AuthGuard)
  @ResolveField(() => UserContentRewardItem)
  async userContentRewardItem(
    @Parent() contentRewardItem: ContentRewardItem,
    @CurrentUser() user: User,
  ) {
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
