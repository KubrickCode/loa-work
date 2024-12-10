import {
  Field,
  Int,
  ObjectType,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from './content.object';
import { ContentReward } from './content-reward.object';
import { ContentCategory } from './content-category.object';
import * as Prisma from '@prisma/client';
import { ContentWageService } from '../service/content-wage.service';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';

@ObjectType()
export class ContentWage {
  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  goldAmount: number;
}

@Resolver(() => Content)
export class ContentResolver {
  constructor(
    private prisma: PrismaService,
    private contentWageService: ContentWageService,
  ) {}

  @ResolveField(() => ContentCategory)
  async contentCategory(@Parent() content: Content) {
    return await this.prisma.contentCategory.findUniqueOrThrow({
      where: {
        id: content.contentCategoryId,
      },
    });
  }

  @ResolveField(() => [ContentReward])
  async contentRewards(@Parent() content: Content, @CurrentUser() user?: User) {
    return await this.prisma.contentReward.findMany({
      where: {
        contentId: content.id,
        ...(user
          ? { userId: user.id }
          : { user: { role: Prisma.UserRole.OWNER } }),
      },
    });
  }

  @ResolveField(() => String)
  async displayName(@Parent() content: Content) {
    const { gate, isSeeMore, name } = content;
    return `${name}${gate ? ` ${gate}관문` : ''}${isSeeMore ? ' 더보기' : ''}`;
  }

  @ResolveField(() => Int)
  async duration(@Parent() content: Content, @CurrentUser() user?: User) {
    const defaultDuration = await this.prisma.contentDuration.findUniqueOrThrow(
      {
        where: {
          contentId: content.id,
        },
      },
    );

    return user
      ? (
          await this.prisma.userContentDuration.findUniqueOrThrow({
            where: {
              contentDurationId_userId: {
                contentDurationId: defaultDuration.id,
                userId: user.id,
              },
            },
            select: { value: true },
          })
        ).value
      : defaultDuration.defaultValue;
  }

  @ResolveField(() => ContentWage)
  async wage(@Parent() content: Content, @CurrentUser() user?: User) {
    const { wageFilter: filter } = content;

    const rewards = await this.prisma.contentReward.findMany({
      where: {
        ...(user
          ? { userId: user.id }
          : { user: { role: Prisma.UserRole.OWNER } }),
        contentId: content.id,
        ...(filter?.includeIsBound === false && { isSellable: true }),
        ...(filter?.includeContentRewardItems && {
          contentRewardItem: { name: { in: filter.includeContentRewardItems } },
        }),
      },
    });

    const gold = await this.contentWageService.calculateRewardsGold({
      content,
      rewards,
      includeIsSeeMore:
        filter?.includeIsSeeMore === true && content.isSeeMore === false,
      excludeIsBound: filter?.includeIsBound === false,
      userId: user?.id,
    });

    const duration = await this.duration(content, user);

    return await this.contentWageService.calculateWage({
      gold,
      duration,
    });
  }
}
