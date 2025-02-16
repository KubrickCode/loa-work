import { Args, Field, InputType, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { ContentWageService } from '../service/content-wage.service';
import { UserContentService } from '../../user/service/user-content.service';
import { ContentWage } from '../object/content-wage.object';
import { OrderByArg } from 'src/common/object/order-by-arg.object';
import _ from 'lodash';

@InputType()
export class ContentWageListFilter {
  @Field(() => Int, { nullable: true })
  contentCategoryId?: number;

  @Field(() => [Int], { nullable: true })
  includeContentRewardItemIds?: number[];

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;
}

@Resolver()
export class ContentWageListQuery {
  constructor(
    private prisma: PrismaService,
    private contentWageService: ContentWageService,
    private userContentService: UserContentService,
  ) {}

  @Query(() => [ContentWage])
  async contentWageList(
    @Args('filter', { nullable: true }) filter?: ContentWageListFilter,
    @Args('orderBy', {
      type: () => [OrderByArg],
      nullable: true,
    })
    orderBy?: OrderByArg[],
  ) {
    const contents = await this.prisma.content.findMany({
      where: this.buildWhereArgs(filter),
      orderBy: [
        {
          contentCategory: {
            id: 'asc',
          },
        },
        {
          level: 'asc',
        },
        {
          id: 'asc',
        },
      ],
      include: {
        contentSeeMoreRewards: {
          include: {
            contentRewardItem: true,
          },
        },
      },
    });

    const promises = contents.map(async (content) => {
      const rewards = await this.userContentService.getContentRewards(
        content.id,
        {
          includeIsBound: filter?.includeIsBound,
          includeContentRewardItemIds: filter?.includeContentRewardItemIds,
        },
      );

      const rewardsGold = await this.contentWageService.calculateGold(rewards);

      const shouldIncludeSeeMoreRewards =
        filter?.includeIsSeeMore &&
        filter?.includeIsBound !== false &&
        content.contentSeeMoreRewards.length > 0;

      const seeMoreGold = shouldIncludeSeeMoreRewards
        ? await this.contentWageService.calculateSeeMoreRewardsGold(
            content.contentSeeMoreRewards,
            filter.includeContentRewardItemIds,
          )
        : 0;

      const gold = rewardsGold + seeMoreGold;

      const duration = await this.userContentService.getContentDuration(
        content.id,
      );

      const { krwAmountPerHour, goldAmountPerHour } =
        await this.contentWageService.calculateWage({
          gold,
          duration,
        });

      return {
        contentId: content.id,
        krwAmountPerHour,
        goldAmountPerHour,
        goldAmountPerClear: Math.round(gold),
      };
    });

    const result = orderBy
      ? _.orderBy(
          await Promise.all(promises),
          orderBy.map((order) => order.field),
          orderBy.map((order) => order.order),
        )
      : await Promise.all(promises);

    return result;
  }

  buildWhereArgs(filter?: ContentWageListFilter) {
    const where: Prisma.ContentWhereInput = {};

    if (filter?.contentCategoryId) {
      where.contentCategoryId = filter.contentCategoryId;
    }

    return where;
  }
}
