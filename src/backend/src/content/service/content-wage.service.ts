import { Injectable } from '@nestjs/common';
import { UserContentService } from '../../user/service/user-content.service';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { PrismaService } from 'src/prisma';

type Reward = {
  averageQuantity: number;
  contentRewardItemId: number;
};

@Injectable()
export class ContentWageService {
  constructor(
    private userContentService: UserContentService,
    private userGoldExchangeRateService: UserGoldExchangeRateService,
    private prisma: PrismaService,
  ) {}

  async calculateGold(rewards: Reward[]) {
    let gold = 0;

    for (const reward of rewards) {
      const price = await this.userContentService.getContentRewardItemPrice(
        reward.contentRewardItemId,
      );

      const averageQuantity = reward.averageQuantity;
      gold += price * averageQuantity;
    }

    return gold;
  }

  async calculateSeeMoreRewardsGold(
    contentSeeMoreRewards: {
      contentRewardItemId: number;
      quantity: number;
    }[],
    includeContentRewardItemIds?: number[],
  ) {
    const seeMoreRewards = contentSeeMoreRewards
      .filter((reward) => {
        if (
          includeContentRewardItemIds &&
          !includeContentRewardItemIds.includes(reward.contentRewardItemId)
        ) {
          return false;
        }
        return true;
      })
      .map((reward) => ({
        averageQuantity: reward.quantity,
        contentRewardItemId: reward.contentRewardItemId,
      }));

    return await this.calculateGold(seeMoreRewards);
  }

  async calculateWage({ gold, duration }: { gold: number; duration: number }) {
    const goldExchangeRate =
      await this.userGoldExchangeRateService.getGoldExchangeRate();

    const totalKRW =
      (gold * goldExchangeRate.krwAmount) / goldExchangeRate.goldAmount;

    const hours = duration / 3600;
    const hourlyWage = totalKRW / hours;
    const hourlyGold = gold / hours;

    return {
      krwAmountPerHour: Math.round(hourlyWage),
      goldAmountPerHour: Math.round(hourlyGold),
    };
  }

  // TODO: test
  async getContentWage(
    contentId: number,
    filter: {
      includeIsBound?: boolean;
      includeContentRewardItemIds?: number[];
      includeIsSeeMore?: boolean;
    },
  ) {
    const content = await this.prisma.content.findUniqueOrThrow({
      where: { id: contentId },
    });

    const rewards = await this.userContentService.getContentRewards(
      content.id,
      {
        includeIsBound: filter?.includeIsBound,
        includeContentRewardItemIds: filter?.includeContentRewardItemIds,
      },
    );

    const seeMoreRewards =
      await this.userContentService.getContentSeeMoreRewards(content.id, {
        includeContentRewardItemIds: filter?.includeContentRewardItemIds,
      });

    const rewardsGold = await this.calculateGold(rewards);

    const shouldIncludeSeeMoreRewards =
      filter?.includeIsSeeMore &&
      filter?.includeIsBound !== false &&
      seeMoreRewards.length > 0;

    const seeMoreGold = shouldIncludeSeeMoreRewards
      ? await this.calculateSeeMoreRewardsGold(
          seeMoreRewards,
          filter.includeContentRewardItemIds,
        )
      : 0;

    const gold = rewardsGold + seeMoreGold;

    const duration = await this.userContentService.getContentDuration(
      content.id,
    );

    const { krwAmountPerHour, goldAmountPerHour } = await this.calculateWage({
      gold,
      duration,
    });

    return {
      contentId: content.id,
      krwAmountPerHour,
      goldAmountPerHour,
      goldAmountPerClear: Math.round(gold),
    };
  }

  async getContentGroupWage(
    contentIds: number[],
    filter: {
      includeIsBound?: boolean;
      includeContentRewardItemIds?: number[];
      includeIsSeeMore?: boolean;
    },
  ) {
    let totalGold = 0;
    let totalDuration = 0;

    for (const contentId of contentIds) {
      const content = await this.prisma.content.findUniqueOrThrow({
        where: { id: contentId },
      });

      const rewards = await this.userContentService.getContentRewards(
        content.id,
        {
          includeIsBound: filter?.includeIsBound,
          includeContentRewardItemIds: filter?.includeContentRewardItemIds,
        },
      );

      const seeMoreRewards =
        await this.userContentService.getContentSeeMoreRewards(content.id, {
          includeContentRewardItemIds: filter?.includeContentRewardItemIds,
        });

      const rewardsGold = await this.calculateGold(rewards);

      const shouldIncludeSeeMoreRewards =
        filter?.includeIsSeeMore &&
        filter?.includeIsBound !== false &&
        seeMoreRewards.length > 0;

      const seeMoreGold = shouldIncludeSeeMoreRewards
        ? await this.calculateSeeMoreRewardsGold(
            seeMoreRewards,
            filter.includeContentRewardItemIds,
          )
        : 0;

      const gold = rewardsGold + seeMoreGold;
      totalGold += gold;

      const duration = await this.userContentService.getContentDuration(
        content.id,
      );
      totalDuration += duration;
    }

    const { krwAmountPerHour, goldAmountPerHour } = await this.calculateWage({
      gold: totalGold,
      duration: totalDuration,
    });

    return {
      krwAmountPerHour,
      goldAmountPerHour,
      goldAmountPerClear: Math.round(totalGold),
    };
  }
}
