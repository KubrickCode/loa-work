import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserSeedService {
  constructor() {}

  async makeAllSeedData(userId: number, tx: Prisma.TransactionClient) {
    const user = await tx.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
        userContentRewards: true,
        userContentDurations: true,
        userContentRewardItems: true,
        userGoldExchangeRate: true,
      },
    });

    if (!user.userContentRewards.length) {
      await this.makeContentRewards(userId, tx);
    }

    if (!user.userContentDurations.length) {
      await this.makeContentDurations(userId, tx);
    }

    if (!user.userContentRewardItems.length) {
      await this.makeContentRewardItems(userId, tx);
    }

    if (!user.userGoldExchangeRate) {
      await this.makeGoldExchangeRate(userId, tx);
    }
  }

  async makeContentRewards(userId: number, tx: Prisma.TransactionClient) {
    const defaultRewards = await tx.contentReward.findMany();

    await tx.userContentReward.createMany({
      data: defaultRewards.map(
        ({ id, defaultAverageQuantity: averageQuantity }) => ({
          contentRewardId: id,
          averageQuantity,
          userId,
        }),
      ),
    });
  }

  async makeContentRewardItems(userId: number, tx: Prisma.TransactionClient) {
    const defaultRewardItems = await tx.contentRewardItem.findMany({
      where: {
        isEditable: true,
      },
      include: {
        contentRewardItemPrices: {
          take: 1,
        },
      },
    });

    await tx.userContentRewardItem.createMany({
      data: defaultRewardItems.map(({ id, contentRewardItemPrices }) => ({
        contentRewardItemId: id,
        price: contentRewardItemPrices[0].value,
        userId,
      })),
    });
  }

  async makeContentDurations(userId: number, tx: Prisma.TransactionClient) {
    const defaultDurations = await tx.contentDuration.findMany();

    await tx.userContentDuration.createMany({
      data: defaultDurations.map(({ id, defaultValue: value }) => ({
        contentDurationId: id,
        value,
        userId,
      })),
    });
  }

  async makeGoldExchangeRate(userId: number, tx: Prisma.TransactionClient) {
    const { krwAmount, goldAmount } = await tx.goldExchangeRate.findFirst();

    await tx.userGoldExchangeRate.create({
      data: {
        userId,
        krwAmount,
        goldAmount,
      },
    });
  }
}
