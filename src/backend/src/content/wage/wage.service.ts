import { Injectable } from "@nestjs/common";
import { sum, sumBy } from "es-toolkit";
import { PrismaService } from "src/prisma";
import { UserGoldExchangeRateService } from "src/user/service/user-gold-exchange-rate.service";
import { UserContentService } from "../../user/service/user-content.service";

type Reward = {
  averageQuantity: number;
  itemId: number;
};

type WageFilter = {
  includeBound?: boolean;
  includeItemIds?: number[];
  includeSeeMore?: boolean;
};

type ContentWageData = {
  duration: number;
  gold: number;
};

@Injectable()
export class ContentWageService {
  private static readonly SECONDS_PER_HOUR = 3600;

  constructor(
    private userContentService: UserContentService,
    private userGoldExchangeRateService: UserGoldExchangeRateService,
    private prisma: PrismaService
  ) {}

  async calculateGold(rewards: Reward[], userId?: number) {
    const goldValues = await Promise.all(
      rewards.map(async (reward) => {
        const price = await this.userContentService.getItemPrice(reward.itemId, userId);
        return price * reward.averageQuantity;
      })
    );

    return sum(goldValues);
  }

  async calculateSeeMoreRewardsGold(
    contentSeeMoreRewards: {
      itemId: number;
      quantity: number;
    }[],
    userId?: number,
    includeItemIds?: number[]
  ) {
    const seeMoreRewards = contentSeeMoreRewards
      .filter((reward) => !includeItemIds || includeItemIds.includes(reward.itemId))
      .map((reward) => ({
        averageQuantity: reward.quantity,
        itemId: reward.itemId,
      }));

    return await this.calculateGold(seeMoreRewards, userId);
  }

  async calculateWage({ duration, gold }: { duration: number; gold: number }, userId?: number) {
    const goldExchangeRate = await this.userGoldExchangeRateService.getGoldExchangeRate(userId);

    const totalKRW = (gold * goldExchangeRate.krwAmount) / goldExchangeRate.goldAmount;

    const hours = duration / ContentWageService.SECONDS_PER_HOUR;
    const hourlyWage = totalKRW / hours;
    const hourlyGold = gold / hours;

    return {
      goldAmountPerHour: Math.round(hourlyGold),
      krwAmountPerHour: Math.round(hourlyWage),
    };
  }

  async getContentGroupWage(contentIds: number[], userId: number | undefined, filter: WageFilter) {
    const dataList = await Promise.all(
      contentIds.map((id) => this.calculateContentWageData(id, userId, filter))
    );

    const totalGold = sumBy(dataList, (data) => data.gold);
    const totalDuration = sumBy(dataList, (data) => data.duration);

    const { goldAmountPerHour, krwAmountPerHour } = await this.calculateWage(
      { duration: totalDuration, gold: totalGold },
      userId
    );

    return {
      goldAmountPerClear: Math.round(totalGold),
      goldAmountPerHour,
      krwAmountPerHour,
    };
  }

  async getContentWage(contentId: number, userId: number | undefined, filter: WageFilter) {
    const { duration, gold } = await this.calculateContentWageData(contentId, userId, filter);

    const { goldAmountPerHour, krwAmountPerHour } = await this.calculateWage(
      { duration, gold },
      userId
    );

    return {
      contentId,
      goldAmountPerClear: Math.round(gold),
      goldAmountPerHour,
      krwAmountPerHour,
    };
  }

  private async calculateContentWageData(
    contentId: number,
    userId: number | undefined,
    filter: WageFilter
  ): Promise<ContentWageData> {
    const content = await this.prisma.content.findUniqueOrThrow({
      where: { id: contentId },
    });

    const rewards = await this.userContentService.getContentRewards(content.id, userId, {
      includeBound: filter?.includeBound,
      includeItemIds: filter?.includeItemIds,
    });

    const seeMoreRewards = await this.userContentService.getContentSeeMoreRewards(
      content.id,
      userId,
      {
        includeItemIds: filter?.includeItemIds,
      }
    );

    const rewardsGold = await this.calculateGold(rewards, userId);

    const shouldIncludeSeeMoreRewards = this.shouldIncludeSeeMore(filter, seeMoreRewards);

    const seeMoreGold = shouldIncludeSeeMoreRewards
      ? await this.calculateSeeMoreRewardsGold(seeMoreRewards, userId, filter.includeItemIds)
      : 0;

    const gold = rewardsGold + seeMoreGold;
    const duration = await this.userContentService.getContentDuration(content.id, userId);

    return { duration, gold };
  }

  private shouldIncludeSeeMore(
    filter: WageFilter,
    seeMoreRewards: { itemId: number; quantity: number }[]
  ): boolean {
    return (
      filter?.includeSeeMore === true && filter?.includeBound !== false && seeMoreRewards.length > 0
    );
  }
}
