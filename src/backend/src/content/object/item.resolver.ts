import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Item } from './item.object';
import { UserContentService } from 'src/user/service/user-content.service';
import { User } from 'src/common/object/user.object';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { PrismaService } from 'src/prisma';
import { UserItem } from './user-item.object';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Item)
export class ItemResolver {
  constructor(
    private userContentService: UserContentService,
    private prisma: PrismaService,
  ) {}

  @ResolveField(() => String)
  async pieColor(@Parent() item: Item) {
    const colorMap: Record<string, string> = {
      골드: '#FFD700', // 금색
      '골드(귀속)': '#FFD700', // 금색
      '운명의 파편': '#8A2BE2', // 보라색
      '운명의 돌파석': '#9370DB', // 연한 보라색
      '운명의 파괴석': '#DC143C', // 진한 빨간색 (Crimson)
      '운명의 수호석': '#4169E1', // 로얄 블루
      '1레벨 보석': '#E60073', // 핑크색
      '용암의 숨결': '#FF4500', // 붉은 오렌지색
      '빙하의 숨결': '#1E90FF', // 밝은 파란색
    };

    return colorMap[item.name] || '#8884d8';
  }

  @ResolveField(() => Float)
  async price(@Parent() item: Item) {
    return await this.userContentService.getItemPrice(item.id);
  }

  @UseGuards(AuthGuard)
  @ResolveField(() => UserItem)
  async userItem(@Parent() item: Item, @CurrentUser() user: User) {
    return await this.prisma.userItem.findUniqueOrThrow({
      where: {
        userId_itemId: {
          userId: user.id,
          itemId: item.id,
        },
      },
    });
  }
}
