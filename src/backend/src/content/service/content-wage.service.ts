import { Injectable } from '@nestjs/common';
import { UserContentService } from '../../user/service/user-content.service';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';

type Reward = {
  averageQuantity: number;
  contentRewardItemId: number;
};

@Injectable()
export class ContentWageService {
  constructor(
    private userContentService: UserContentService,
    private userGoldExchangeRateService: UserGoldExchangeRateService,
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

  async calculateGoldByDate(rewards: Reward[], date: Date) {
    let gold = 0;

    for (const reward of rewards) {
      const price =
        await this.userContentService.getContentRewardItemAveragePriceByDate(
          reward.contentRewardItemId,
          date,
        );

      gold += price * reward.averageQuantity;
    }

    return gold;
  }

  async calculateSeeMoreRewardsGold(
    contentSeeMoreRewards: {
      contentRewardItemId: number;
      quantity: {
        toNumber: () => number;
      };
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
        averageQuantity: reward.quantity.toNumber(),
        contentRewardItemId: reward.contentRewardItemId,
      }));

    return await this.calculateGold(seeMoreRewards);
  }

  async calculateSeeMoreRewardsGoldByDate(
    contentSeeMoreRewards: {
      contentRewardItemId: number;
      quantity: {
        toNumber: () => number;
      };
    }[],
    date: Date,
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
        averageQuantity: reward.quantity.toNumber(),
        contentRewardItemId: reward.contentRewardItemId,
      }));

    return await this.calculateGoldByDate(seeMoreRewards, date);
  }

  async calculateWage({ gold, duration }: { gold: number; duration: number }) {
    const goldExchangeRate =
      await this.userGoldExchangeRateService.getGoldExchangeRate();

    const totalKRW =
      (gold * goldExchangeRate.goldAmount) / goldExchangeRate.krwAmount;

    const hours = duration / 3600;
    const hourlyWage = totalKRW / hours;
    const hourlyGold = gold / hours;

    return {
      krwAmountPerHour: Math.round(hourlyWage),
      goldAmountPerHour: Math.round(hourlyGold),
    };
  }
}
