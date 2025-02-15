import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/content')
export class ContentController {
  constructor(private prisma: PrismaService) {}

  // NOTE: 거의 사용되지 않는 기능이라 특별히 코드 정리 및 보수하지 않음.
  @Get('predict-rewards')
  async predictRewards(
    @Query('categoryId') categoryIdString: string,
    @Query('level') levelString: string,
  ) {
    const level = parseInt(levelString, 10);
    const categoryId = parseInt(categoryIdString, 10);

    const category = await this.prisma.contentCategory.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });

    const previousContents = await this.prisma.content.findMany({
      where: {
        contentCategory: {
          id: categoryId,
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
      categoryName: category.name,
      targetLevel: level,
      basedOnLevels: previousContents.map((c) => c.level),
      predictions,
    };
  }

  @Get('validate-rewards-by-reports')
  async validateRewardsByReports(@Query('contentId') contentIdString: string) {
    const contentId = parseInt(contentIdString, 10);

    const content = await this.prisma.content.findUnique({
      where: {
        id: contentId,
      },
      include: {
        contentCategory: true,
        contentRewards: {
          include: {
            contentRewardItem: true,
            reportedContentRewards: true,
          },
        },
      },
    });

    if (!content) {
      return {
        success: false,
        message: '해당하는 컨텐츠를 찾을 수 없습니다.',
      };
    }

    const validations = [];

    for (const reward of content.contentRewards) {
      const reports = reward.reportedContentRewards.map((r) =>
        Number(r.averageQuantity),
      );

      if (reports.length < 3) {
        validations.push({
          itemName: reward.contentRewardItem.name,
          currentQuantity: Number(reward.defaultAverageQuantity),
          status: 'insufficient_data',
          message: '충분한 제보 데이터가 없습니다.',
          reportCount: reports.length,
        });
        continue;
      }

      // 평균과 표준편차 계산
      const mean = reports.reduce((a, b) => a + b) / reports.length;
      const stdDev = Math.sqrt(
        reports.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) /
          reports.length,
      );

      // 이상치 제거 (평균에서 ±2 표준편차 벗어나는 값)
      const validReports = reports.filter(
        (r) => Math.abs(r - mean) <= 2 * stdDev,
      );

      const validMean =
        validReports.reduce((a, b) => a + b) / validReports.length;
      const currentQuantity = Number(reward.defaultAverageQuantity);
      const difference =
        ((validMean - currentQuantity) / currentQuantity) * 100;

      validations.push({
        itemName: reward.contentRewardItem.name,
        currentQuantity,
        reportedQuantity: validMean,
        difference: `${difference.toFixed(1)}%`,
        status:
          Math.abs(difference) > 10 ? 'significant_difference' : 'acceptable',
        totalReports: reports.length,
        validReports: validReports.length,
        excludedReports: reports.length - validReports.length,
      });
    }

    return {
      success: true,
      contentId,
      categoryName: content.contentCategory.name,
      level: content.level,
      validations,
    };
  }
}
