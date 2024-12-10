import { PrismaService } from 'src/prisma';
import { Injectable } from '@nestjs/common';
import * as Prisma from '@prisma/client';
import { Content } from '../object/content.object';
import { UserContentService } from './user-content.service';

@Injectable()
export class ContentWageService {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
  ) {}

  async calculateRewardsGold({
    content,
    rewards,
    includeIsSeeMore,
    excludeIsBound,
    userId,
  }: {
    content: Content;
    rewards: Prisma.ContentReward[];
    includeIsSeeMore: boolean;
    excludeIsBound: boolean;
    userId?: number;
  }) {
    let gold = await this.calculateGold(rewards, userId);

    if (includeIsSeeMore) {
      const seeMoreContent = await this.prisma.content.findUniqueOrThrow({
        where: {
          name_contentCategoryId_gate_isSeeMore: {
            name: content.name,
            contentCategoryId: content.contentCategoryId,
            gate: content.gate,
            isSeeMore: true,
          },
        },
      });

      const seeMoreRewards = await this.prisma.contentReward.findMany({
        where: {
          contentId: seeMoreContent.id,
          ...(userId ? { userId } : { user: { role: Prisma.UserRole.OWNER } }),
          ...(excludeIsBound && { isSellable: true }),
        },
      });

      gold += await this.calculateGold(seeMoreRewards);
    }

    return gold;
  }

  async calculateGold(rewards: Prisma.ContentReward[], userId?: number) {
    let gold = 0;

    for (const reward of rewards) {
      const price = await this.userContentService.getContentRewardItemPrice(
        reward.contentRewardItemId,
        userId,
      );

      const averageQuantity = reward.averageQuantity.toNumber();
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
      amount: Math.round(hourlyWage),
      goldAmount: Math.round(hourlyGold),
    };
  }
}
