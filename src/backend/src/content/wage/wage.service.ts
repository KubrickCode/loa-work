import { Injectable } from "@nestjs/common";
import { UserContentService } from "../../user/service/user-content.service";
import { UserGoldExchangeRateService } from "src/user/service/user-gold-exchange-rate.service";
import { PrismaService } from "src/prisma";

type Reward = {
  averageQuantity: number;
  itemId: number;
};

@Injectable()
export class ContentWageService {
  constructor(
    private userContentService: UserContentService,
    private userGoldExchangeRateService: UserGoldExchangeRateService,
    private prisma: PrismaService
  ) {}

  async calculateGold(rewards: Reward[], userId?: number) {
    let gold = 0;

    for (const reward of rewards) {
      const price = await this.userContentService.getItemPrice(reward.itemId, userId);

      const averageQuantity = reward.averageQuantity;
      gold += price * averageQuantity;
    }

    return gold;
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
      .filter((reward) => {
        if (includeItemIds && !includeItemIds.includes(reward.itemId)) {
          return false;
        }
        return true;
      })
      .map((reward) => ({
        averageQuantity: reward.quantity,
        itemId: reward.itemId,
      }));

    return await this.calculateGold(seeMoreRewards, userId);
  }

  async calculateWage({ duration, gold }: { duration: number; gold: number }, userId?: number) {
    const goldExchangeRate = await this.userGoldExchangeRateService.getGoldExchangeRate(userId);

    const totalKRW = (gold * goldExchangeRate.krwAmount) / goldExchangeRate.goldAmount;

    const hours = duration / 3600;
    const hourlyWage = totalKRW / hours;
    const hourlyGold = gold / hours;

    return {
      goldAmountPerHour: Math.round(hourlyGold),
      krwAmountPerHour: Math.round(hourlyWage),
    };
  }

  async getContentGroupWage(
    contentIds: number[],
    userId: number | undefined,
    filter: {
      includeBound?: boolean;
      includeItemIds?: number[];
      includeSeeMore?: boolean;
    }
  ) {
    let totalGold = 0;
    let totalDuration = 0;

    for (const contentId of contentIds) {
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

      const shouldIncludeSeeMoreRewards =
        filter?.includeSeeMore && filter?.includeBound !== false && seeMoreRewards.length > 0;

      const seeMoreGold = shouldIncludeSeeMoreRewards
        ? await this.calculateSeeMoreRewardsGold(seeMoreRewards, userId, filter.includeItemIds)
        : 0;

      const gold = rewardsGold + seeMoreGold;
      totalGold += gold;

      const duration = await this.userContentService.getContentDuration(content.id, userId);
      totalDuration += duration;
    }

    const { goldAmountPerHour, krwAmountPerHour } = await this.calculateWage(
      {
        duration: totalDuration,
        gold: totalGold,
      },
      userId
    );

    return {
      goldAmountPerClear: Math.round(totalGold),
      goldAmountPerHour,
      krwAmountPerHour,
    };
  }

  // TODO: test
  async getContentWage(
    contentId: number,
    userId: number | undefined,
    filter: {
      includeBound?: boolean;
      includeItemIds?: number[];
      includeSeeMore?: boolean;
    }
  ) {
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

    const shouldIncludeSeeMoreRewards =
      filter?.includeSeeMore && filter?.includeBound !== false && seeMoreRewards.length > 0;

    const seeMoreGold = shouldIncludeSeeMoreRewards
      ? await this.calculateSeeMoreRewardsGold(seeMoreRewards, userId, filter.includeItemIds)
      : 0;

    const gold = rewardsGold + seeMoreGold;

    const duration = await this.userContentService.getContentDuration(content.id, userId);

    const { goldAmountPerHour, krwAmountPerHour } = await this.calculateWage(
      {
        duration,
        gold,
      },
      userId
    );

    return {
      contentId: content.id,
      goldAmountPerClear: Math.round(gold),
      goldAmountPerHour,
      krwAmountPerHour,
    };
  }
}
