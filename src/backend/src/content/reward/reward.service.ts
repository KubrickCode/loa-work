import { Injectable } from "@nestjs/common";
import { Prisma, UserRole } from "@prisma/client";
import { PrismaService } from "src/prisma";
import {
  EditContentRewardsInput,
  EditContentRewardsResult,
  ReportContentRewardsInput,
  ReportContentRewardsResult,
} from "./reward.dto";

type TransactionClient = Prisma.TransactionClient;

@Injectable()
export class RewardService {
  constructor(private prisma: PrismaService) {}

  async editContentRewards(
    input: EditContentRewardsInput,
    userId: number,
    userRole: UserRole
  ): Promise<EditContentRewardsResult> {
    return await this.prisma.$transaction(async (tx) => {
      if (userRole === UserRole.OWNER) {
        await this.updateOwnerRewards(tx, input);
      }

      await this.upsertUserRewards(tx, input, userId);

      if (input.isReportable) {
        await this.createRewardReports(tx, input, userId);
      }

      return { ok: true };
    });
  }

  async reportContentRewards(
    input: ReportContentRewardsInput,
    userId: number
  ): Promise<ReportContentRewardsResult> {
    return await this.prisma.$transaction(async (tx) => {
      await Promise.all(
        input.contentRewards.map(async ({ averageQuantity, id }) => {
          return tx.reportedContentReward.create({
            data: {
              averageQuantity,
              contentRewardId: id,
              userId,
            },
          });
        })
      );

      return { ok: true };
    });
  }

  private async createRewardReports(
    tx: TransactionClient,
    input: EditContentRewardsInput,
    userId: number
  ): Promise<void> {
    await Promise.all(
      input.contentRewards.map(async ({ averageQuantity, contentId, itemId }) => {
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

  private async updateOwnerRewards(
    tx: TransactionClient,
    input: EditContentRewardsInput
  ): Promise<void> {
    await Promise.all(
      input.contentRewards.map(async ({ averageQuantity, contentId, isSellable, itemId }) => {
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

  private async upsertUserRewards(
    tx: TransactionClient,
    input: EditContentRewardsInput,
    userId: number
  ): Promise<void> {
    await Promise.all(
      input.contentRewards.map(({ averageQuantity, contentId, isSellable, itemId }) =>
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
  }
}
