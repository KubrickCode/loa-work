import { Controller, Get, Query } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

// TODO: 생각보다 본격적으로 사용되는 기능이라 유지보수 가능한 형태(테스트가 쉬운 형태)로 리팩토링 필요
@Controller("api/content")
export class ContentController {
  constructor(private prisma: PrismaService) {}

  // NOTE: 거의 사용되지 않는 기능이라 특별히 코드 정리 및 보수하지 않음.
  @Get("predict-rewards")
  async predictRewards(
    @Query("categoryId") categoryIdString: string,
    @Query("level") levelString: string
  ) {
    const level = parseInt(levelString, 10);
    const categoryId = parseInt(categoryIdString, 10);

    const category = await this.prisma.contentCategory.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });

    const previousContents = await this.prisma.content.findMany({
      include: {
        contentRewards: {
          include: {
            item: true,
          },
        },
      },
      orderBy: {
        level: "desc",
      },
      where: {
        contentCategory: {
          id: categoryId,
        },
        level: {
          lt: level,
        },
      },
    });

    if (previousContents.length < 2) {
      return {
        message: "예측을 위한 충분한 데이터가 없습니다.",
        success: false,
      };
    }

    const predictions = [];
    const latestContent = previousContents[0];

    for (const latestReward of latestContent.contentRewards) {
      const rewardHistory = previousContents
        .map((content) => {
          const reward = content.contentRewards.find((r) => r.itemId === latestReward.itemId);
          return {
            level: content.level,
            quantity: reward ? Number(reward.averageQuantity) : null,
          };
        })
        .filter((h) => h.quantity !== null);

      if (rewardHistory.length >= 2) {
        let totalIncreaseFactor = 0;
        let increaseCount = 0;

        for (let i = 0; i < rewardHistory.length - 1; i++) {
          const currentQuantity = rewardHistory[i].quantity;
          const previousQuantity = rewardHistory[i + 1].quantity;

          // 이전 수량이 0인 경우 증가율 계산에서 제외
          if (previousQuantity === 0) {
            continue;
          }

          const increaseFactor = currentQuantity / previousQuantity;
          totalIncreaseFactor += increaseFactor;
          increaseCount++;
        }

        const averageIncreaseFactor = increaseCount > 0 ? totalIncreaseFactor / increaseCount : 1;
        const predictedQuantity = Number(latestReward.averageQuantity) * averageIncreaseFactor;

        predictions.push({
          averageIncreaseFactor: averageIncreaseFactor,
          historyLevels: rewardHistory.map((h) => h.level),
          itemName: latestReward.item.name,
          predictedQuantity: predictedQuantity,
          previousQuantity: Number(latestReward.averageQuantity),
        });
      }
    }

    return {
      basedOnLevels: previousContents.map((c) => c.level),
      categoryName: category.name,
      predictions,
      success: true,
      targetLevel: level,
    };
  }

  @Get("validate-rewards-by-reports")
  async validateRewardsByReports(@Query("contentId") contentIdString: string) {
    const contentId = parseInt(contentIdString, 10);

    const content = await this.prisma.content.findUnique({
      include: {
        contentCategory: true,
        contentRewards: {
          include: {
            item: true,
            reportedContentRewards: true,
          },
        },
      },
      where: {
        id: contentId,
      },
    });

    if (!content) {
      return {
        message: "해당하는 컨텐츠를 찾을 수 없습니다.",
        success: false,
      };
    }

    const validations = [];

    for (const reward of content.contentRewards) {
      const reports = reward.reportedContentRewards.map((r) => Number(r.averageQuantity));

      if (reports.length < 3) {
        validations.push({
          currentQuantity: Number(reward.averageQuantity),
          itemName: reward.item.name,
          message: "충분한 제보 데이터가 없습니다.",
          reportCount: reports.length,
          status: "insufficient_data",
        });
        continue;
      }

      // 평균과 표준편차 계산
      const mean = reports.reduce((a, b) => a + b) / reports.length;
      const stdDev = Math.sqrt(
        reports.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / reports.length
      );

      // 이상치 제거 (평균에서 ±2 표준편차 벗어나는 값)
      const validReports = reports.filter((r) => Math.abs(r - mean) <= 2 * stdDev);

      const validMean = validReports.reduce((a, b) => a + b) / validReports.length;
      const currentQuantity = Number(reward.averageQuantity);

      // currentQuantity가 0인 경우 특별 처리
      let difference: string;
      let status: string;

      if (currentQuantity === 0) {
        if (validMean === 0) {
          difference = "0.0%";
          status = "acceptable";
        } else {
          difference = "N/A (기준값 0)";
          status = "base_value_zero";
        }
      } else {
        const diffValue = ((validMean - currentQuantity) / currentQuantity) * 100;
        difference = `${diffValue.toFixed(1)}%`;
        status = Math.abs(diffValue) > 10 ? "significant_difference" : "acceptable";
      }

      validations.push({
        currentQuantity,
        difference,
        excludedReports: reports.length - validReports.length,
        itemName: reward.item.name,
        reportedQuantity: validMean,
        status,
        totalReports: reports.length,
        validReports: validReports.length,
      });
    }

    return {
      categoryName: content.contentCategory.name,
      contentId,
      level: content.level,
      success: true,
      validations,
    };
  }
}
