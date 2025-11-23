import { Injectable } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { PrismaService } from "src/prisma";
import { ContentRewardEditInput, ContentRewardReportInput } from "../dto";

@Injectable()
export class ContentRewardService {
  constructor(private readonly prisma: PrismaService) {}

  async editContentRewards(
    userId: number,
    userRole: UserRole,
    rewards: ContentRewardEditInput[],
    isReportable: boolean
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      if (userRole === UserRole.OWNER) {
        await Promise.all(
          rewards.map(async ({ averageQuantity, contentId, isSellable, itemId }) => {
            await tx.contentReward.update({
              data: {
                averageQuantity,
                isSellable,
              },
              where: {
                contentId_itemId: {
                  contentId,
                  itemId,
                },
              },
            });
          })
        );
      }

      await Promise.all(
        rewards.map(({ averageQuantity, contentId, isSellable, itemId }) =>
          tx.userContentReward.upsert({
            create: {
              averageQuantity,
              contentId,
              isSellable,
              itemId,
              userId,
            },
            update: { averageQuantity, isSellable },
            where: {
              userId_contentId_itemId: { contentId, itemId, userId },
            },
          })
        )
      );

      if (isReportable) {
        await Promise.all(
          rewards.map(async ({ averageQuantity, contentId, itemId }) => {
            const contentReward = await tx.contentReward.findUniqueOrThrow({
              where: { contentId_itemId: { contentId, itemId } },
            });

            return tx.reportedContentReward.create({
              data: {
                averageQuantity,
                contentRewardId: contentReward.id,
                userId,
              },
            });
          })
        );
      }
    });
  }

  async reportContentRewards(userId: number, reports: ContentRewardReportInput[]): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await Promise.all(
        reports.map(async ({ averageQuantity, id }) => {
          return tx.reportedContentReward.create({
            data: {
              averageQuantity,
              contentRewardId: id,
              userId,
            },
          });
        })
      );
    });
  }
}
