import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor() {}

  async makeUserContentRewards(userId: number, tx: Prisma.TransactionClient) {
    const defaultRewards = await tx.contentReward.findMany();

    await tx.userContentReward.createMany({
      data: defaultRewards.map(
        ({ id, defaultAverageQuantity: averageQuantity, isSellable }) => ({
          contentRewardId: id,
          averageQuantity,
          userId,
        }),
      ),
    });
  }

  async makeUserContentRewardItems(
    userId: number,
    tx: Prisma.TransactionClient,
  ) {
    const defaultRewardItems = await tx.contentRewardItem.findMany();

    await tx.userContentRewardItem.createMany({
      data: defaultRewardItems.map(({ id, defaultPrice: price }) => ({
        contentRewardItemId: id,
        price,
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
}
