import { Injectable } from "@nestjs/common";
import { Prisma, UserRole } from "@prisma/client";
import { PrismaService } from "src/prisma";
import {
  EditContentSeeMoreRewardsInput,
  EditContentSeeMoreRewardsResult,
} from "./see-more-reward.dto";

type TransactionClient = Prisma.TransactionClient;

@Injectable()
export class SeeMoreRewardService {
  constructor(private prisma: PrismaService) {}

  async editContentSeeMoreRewards(
    input: EditContentSeeMoreRewardsInput,
    userId: number,
    userRole: UserRole
  ): Promise<EditContentSeeMoreRewardsResult> {
    return await this.prisma.$transaction(async (tx) => {
      if (userRole === UserRole.OWNER) {
        await this.updateOwnerSeeMoreRewards(tx, input);
      }

      await this.upsertUserSeeMoreRewards(tx, input, userId);

      return { ok: true };
    });
  }

  private async updateOwnerSeeMoreRewards(
    tx: TransactionClient,
    input: EditContentSeeMoreRewardsInput
  ): Promise<void> {
    await Promise.all(
      input.contentSeeMoreRewards.map(async ({ contentId, itemId, quantity }) => {
        await tx.contentSeeMoreReward.update({
          data: {
            quantity,
          },
          where: {
            contentId_itemId: { contentId, itemId },
          },
        });
      })
    );
  }

  private async upsertUserSeeMoreRewards(
    tx: TransactionClient,
    input: EditContentSeeMoreRewardsInput,
    userId: number
  ): Promise<void> {
    await Promise.all(
      input.contentSeeMoreRewards.map(({ contentId, itemId, quantity }) =>
        tx.userContentSeeMoreReward.upsert({
          create: { contentId, itemId, quantity, userId },
          update: { quantity },
          where: {
            userId_contentId_itemId: { contentId, itemId, userId },
          },
        })
      )
    );
  }
}
