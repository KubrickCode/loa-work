import { Args, Field, InputType, Int, Query, Resolver } from '@nestjs/graphql';
import { OrderByArg } from 'src/common/object/order-by-arg.object';
import { PrismaService } from 'src/prisma/prisma.service';
import _ from 'lodash';
import { Prisma } from '@prisma/client';
import { ContentWageService } from '../service/content-wage.service';
import { UserContentService } from 'src/user/service/user-content.service';
import dayjs from 'dayjs';
import {
  ContentWageHistory,
  ContentWithHistories,
} from '../object/content-with-histories.object';

@InputType()
export class ContentWageHistoryListFilter {
  @Field(() => Int, { nullable: true })
  contentCategoryId?: number;

  @Field(() => [Int], { nullable: true })
  includeContentRewardItemIds?: number[];

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}

@Resolver()
export class ContentWageHistoryListQuery {
  constructor(
    private prisma: PrismaService,
    private contentWageService: ContentWageService,
    private userContentService: UserContentService,
  ) {}

  @Query(() => [ContentWithHistories])
  async contentWageHistoryList(
    @Args('filter', { nullable: true }) filter?: ContentWageHistoryListFilter,
    @Args('orderBy', {
      type: () => [OrderByArg],
      nullable: true,
    })
    orderBy?: OrderByArg[],
  ) {
    const contents = await this.prisma.content.findMany({
      where: this.buildWhereArgs(filter),
      include: {
        contentSeeMoreRewards: {
          include: {
            contentRewardItem: true,
          },
        },
      },
    });

    const startDate = dayjs(filter.startDate);
    const endDate = dayjs(filter.endDate);
    const dates = [];
    let currentDate = startDate;
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      dates.push(currentDate.clone());
      currentDate = currentDate.add(1, 'day');
    }

    const promises = contents.map(async (content) => {
      const histories: ContentWageHistory[] = [];

      for (const date of dates) {
        const rewards = await this.userContentService.getContentRewards(
          content.id,
          {
            includeIsBound: filter?.includeIsBound,
            includeContentRewardItemIds: filter?.includeContentRewardItemIds,
          },
        );

        const rewardsGold = await this.contentWageService.calculateGoldByDate(
          rewards,
          date.toDate(),
        );

        const shouldIncludeSeeMoreRewards =
          filter?.includeIsSeeMore &&
          filter?.includeIsBound !== false &&
          content.contentSeeMoreRewards.length > 0;

        const seeMoreGold = shouldIncludeSeeMoreRewards
          ? await this.contentWageService.calculateSeeMoreRewardsGoldByDate(
              content.contentSeeMoreRewards,
              date.toDate(),
              filter?.includeContentRewardItemIds,
            )
          : 0;

        const gold = rewardsGold + seeMoreGold;

        const duration = await this.userContentService.getContentDuration(
          content.id,
        );

        const { goldAmountPerHour } =
          await this.contentWageService.calculateWage({
            gold,
            duration,
          });

        histories.push({
          date: date.format('YYYY-MM-DD'),
          goldAmountPerHour,
        });
      }

      return {
        contentId: content.id,
        histories,
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

  private buildWhereArgs(filter?: ContentWageHistoryListFilter) {
    const where: Prisma.ContentWhereInput = {};

    if (filter?.contentCategoryId) {
      where.contentCategoryId = filter.contentCategoryId;
    }

    return where;
  }
}
