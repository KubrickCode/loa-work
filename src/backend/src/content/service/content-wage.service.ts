import { PrismaService } from 'src/prisma';
import { Injectable } from '@nestjs/common';
import * as Prisma from '@prisma/client';
import { Content } from '../object/content.object';
import { UserContentService } from './user-content.service';

type Reward = {
  averageQuantity: number;
  contentRewardItemId: number;
};

@Injectable()
export class ContentWageService {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
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

  async calculateWage({ gold, duration }: { gold: number; duration: number }) {
    const goldExchangeRate =
      await this.prisma.goldExchangeRate.findFirstOrThrow({
        take: 1,
      });

    const totalKRW =
      (gold * goldExchangeRate.goldAmount) / goldExchangeRate.krwAmount;

    const hours = duration / 3600;
    const hourlyWage = totalKRW / hours;
    const hourlyGold = gold / hours;

    return {
      krwAmount: Math.round(hourlyWage),
      goldAmount: Math.round(hourlyGold),
    };
  }
}
