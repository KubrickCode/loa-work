import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserSeedService {
  async makeAllSeedData(userId: number, tx: Prisma.TransactionClient) {
    const user = await tx.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
        userContentRewards: true,
        userContentSeeMoreRewards: true,
        userItems: true,
        userGoldExchangeRate: true,
      },
    });

    if (!user.userContentRewards.length) {
      await this.makeContentRewards(userId, tx, user.createdAt);
    }

    if (!user.userContentSeeMoreRewards.length) {
      await this.makeContentSeeMoreRewards(userId, tx, user.createdAt);
    }

    if (!user.userItems.length) {
      await this.makeItems(userId, tx, user.createdAt);
    }

    if (!user.userGoldExchangeRate) {
      await this.makeGoldExchangeRate(userId, tx, user.createdAt);
    }
  }

  async makeContentRewards(
    userId: number,
    tx: Prisma.TransactionClient,
    createdAt: Date,
  ) {
    const defaultRewards = await tx.contentReward.findMany();

    await tx.userContentReward.createMany({
      data: defaultRewards.map(
        ({ id, defaultAverageQuantity: averageQuantity, isSellable }) => ({
          contentRewardId: id,
          averageQuantity,
          isSellable,
          userId,
          createdAt,
        }),
      ),
    });
  }

  async makeContentSeeMoreRewards(
    userId: number,
    tx: Prisma.TransactionClient,
    createdAt: Date,
  ) {
    const defaultSeeMoreRewards = await tx.contentSeeMoreReward.findMany();

    await tx.userContentSeeMoreReward.createMany({
      data: defaultSeeMoreRewards.map(({ id, quantity }) => ({
        contentSeeMoreRewardId: id,
        quantity,
        userId,
        createdAt,
      })),
    });
  }

  async makeItems(
    userId: number,
    tx: Prisma.TransactionClient,
    createdAt: Date,
  ) {
    const defaultItems = await tx.item.findMany({
      where: {
        isEditable: true,
      },
    });

    await tx.userItem.createMany({
      data: defaultItems.map(({ id, price }) => ({
        itemId: id,
        price,
        userId,
        createdAt,
      })),
    });
  }

  async makeGoldExchangeRate(
    userId: number,
    tx: Prisma.TransactionClient,
    createdAt: Date,
  ) {
    const { krwAmount, goldAmount } = await tx.goldExchangeRate.findFirst();

    await tx.userGoldExchangeRate.create({
      data: {
        userId,
        krwAmount,
        goldAmount,
        createdAt,
      },
    });
  }
}
