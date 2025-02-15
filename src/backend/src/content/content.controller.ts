import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('content')
export class ContentController {
  constructor(private prisma: PrismaService) {}

  // NOTE: 거의 사용되지 않는 기능이라 특별히 코드 정리 및 보수하지 않음.
  @Get('predict-rewards')
  async predictRewards(
    @Query('categoryName') categoryName: string,
    @Query('level') levelString: string,
  ) {
    const level = parseInt(levelString, 10);
    const previousContents = await this.prisma.content.findMany({
      where: {
        contentCategory: {
          name: categoryName,
        },
        level: {
          lt: level,
        },
      },
      include: {
        contentRewards: {
          include: {
            contentRewardItem: true,
          },
        },
      },
      orderBy: {
        level: 'desc',
      },
    });

    if (previousContents.length < 2) {
      return {
        success: false,
        message: '예측을 위한 충분한 데이터가 없습니다.',
      };
    }

    const predictions = [];
    const latestContent = previousContents[0];

    for (const latestReward of latestContent.contentRewards) {
      const rewardHistory = previousContents
        .map((content) => {
          const reward = content.contentRewards.find(
            (r) => r.contentRewardItemId === latestReward.contentRewardItemId,
          );
          return {
            level: content.level,
            quantity: reward ? Number(reward.defaultAverageQuantity) : null,
          };
        })
        .filter((h) => h.quantity !== null);

      if (rewardHistory.length >= 2) {
        let totalIncreaseFactor = 0;
        let increaseCount = 0;

        for (let i = 0; i < rewardHistory.length - 1; i++) {
          const currentQuantity = rewardHistory[i].quantity;
          const previousQuantity = rewardHistory[i + 1].quantity;

          const increaseFactor = currentQuantity / previousQuantity;
          totalIncreaseFactor += increaseFactor;
          increaseCount++;
        }

        const averageIncreaseFactor = totalIncreaseFactor / increaseCount;
        const predictedQuantity =
          Number(latestReward.defaultAverageQuantity) * averageIncreaseFactor;

        predictions.push({
          itemName: latestReward.contentRewardItem.name,
          predictedQuantity: predictedQuantity,
          previousQuantity: Number(latestReward.defaultAverageQuantity),
          averageIncreaseFactor: averageIncreaseFactor,
          historyLevels: rewardHistory.map((h) => h.level),
        });
      }
    }

    return {
      success: true,
      categoryName,
      targetLevel: level,
      basedOnLevels: previousContents.map((c) => c.level),
      predictions,
    };
  }
}
