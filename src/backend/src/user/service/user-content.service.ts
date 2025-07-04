import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CONTEXT } from '@nestjs/graphql';
import { ContextType } from './types';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Injectable()
export class UserContentService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CONTEXT) private context: ContextType,
  ) {}

  getUserId() {
    return this.context.req?.user?.id;
  }

  //  Test 작성
  async getContentRewardItemPrice(contentRewardItemId: number) {
    const userId = this.getUserId();

    const { price: defaultPrice } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: {
          id: contentRewardItemId,
        },
      });

    const { isEditable } =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: {
          id: contentRewardItemId,
        },
      });

    const price =
      userId && isEditable
        ? (
            await this.prisma.userContentRewardItem.findUniqueOrThrow({
              where: {
                userId_contentRewardItemId: {
                  userId,
                  contentRewardItemId,
                },
              },
            })
          ).price
        : defaultPrice;

    return price.toNumber();
  }

  async getContentDuration(contentId: number) {
    const userId = this.getUserId();

    const contentDuration = await this.prisma.contentDuration.findUniqueOrThrow(
      {
        where: {
          contentId,
        },
      },
    );

    return userId
      ? (
          await this.prisma.userContentDuration.findUniqueOrThrow({
            where: {
              contentDurationId_userId: {
                contentDurationId: contentDuration.id,
                userId,
              },
            },
          })
        ).value
      : contentDuration.defaultValue;
  }

  async getContentRewardAverageQuantity(contentRewardId: number) {
    const userId = this.getUserId();

    const contentReward = await this.prisma.contentReward.findUniqueOrThrow({
      where: {
        id: contentRewardId,
      },
    });

    return userId
      ? (
          await this.prisma.userContentReward.findUniqueOrThrow({
            where: {
              userId_contentRewardId: {
                userId,
                contentRewardId,
              },
            },
          })
        ).averageQuantity
      : contentReward.defaultAverageQuantity;
  }

  async getContentRewardIsSellable(contentRewardId: number) {
    const userId = this.getUserId();

    const contentReward = await this.prisma.contentReward.findUniqueOrThrow({
      where: { id: contentRewardId },
    });

    return userId
      ? (
          await this.prisma.userContentReward.findUniqueOrThrow({
            where: { userId_contentRewardId: { userId, contentRewardId } },
          })
        ).isSellable
      : contentReward.isSellable;
  }

  async getContentSeeMoreRewardQuantity(contentSeeMoreRewardId: number) {
    const userId = this.getUserId();

    const contentSeeMoreReward =
      await this.prisma.contentSeeMoreReward.findUniqueOrThrow({
        where: { id: contentSeeMoreRewardId },
      });

    return userId
      ? (
          await this.prisma.userContentSeeMoreReward.findUniqueOrThrow({
            where: {
              userId_contentSeeMoreRewardId: { userId, contentSeeMoreRewardId },
            },
          })
        ).quantity
      : contentSeeMoreReward.quantity;
  }

  async getContentRewards(
    contentId: number,
    filter?: {
      includeIsBound?: boolean;
      includeContentRewardItemIds?: number[];
    },
  ) {
    const userId = this.getUserId();

    if (userId) {
      const userRewards = await this.prisma.userContentReward.findMany({
        where: {
          userId,
          ...(filter?.includeIsBound === false && { isSellable: true }),
          contentReward: {
            contentId,
            ...(filter?.includeContentRewardItemIds && {
              contentRewardItemId: { in: filter.includeContentRewardItemIds },
            }),
          },
        },
        include: {
          contentReward: true,
        },
      });

      return userRewards.map(({ averageQuantity, contentReward }) => ({
        averageQuantity: averageQuantity.toNumber(),
        contentRewardItemId: contentReward.contentRewardItemId,
      }));
    }

    const where = {
      contentId,
      ...(filter?.includeIsBound === false && { isSellable: true }),
      ...(filter?.includeContentRewardItemIds && {
        contentRewardItemId: { in: filter.includeContentRewardItemIds },
      }),
    };

    const defaultRewards = await this.prisma.contentReward.findMany({
      where,
    });

    return defaultRewards.map(
      ({ defaultAverageQuantity, contentRewardItemId }) => ({
        averageQuantity: defaultAverageQuantity.toNumber(),
        contentRewardItemId,
      }),
    );
  }

  async getContentSeeMoreRewards(
    contentId: number,
    filter?: {
      includeContentRewardItemIds?: number[];
    },
  ) {
    const userId = this.getUserId();

    const where = {
      contentId,
      ...(filter?.includeContentRewardItemIds && {
        contentRewardItemId: { in: filter.includeContentRewardItemIds },
      }),
    };

    if (userId) {
      const userRewards = await this.prisma.userContentSeeMoreReward.findMany({
        where: {
          userId,
          contentSeeMoreReward: where,
        },
        include: {
          contentSeeMoreReward: true,
        },
      });

      return userRewards.map(({ quantity, contentSeeMoreReward }) => ({
        quantity: quantity.toNumber(),
        contentRewardItemId: contentSeeMoreReward.contentRewardItemId,
      }));
    }

    const defaultRewards = await this.prisma.contentSeeMoreReward.findMany({
      where,
    });

    return defaultRewards.map(({ quantity, contentRewardItemId }) => ({
      quantity: quantity.toNumber(),
      contentRewardItemId,
    }));
  }

  async validateUserContentRewards(rewardIds: number[]) {
    const userId = this.getUserId();

    const userContentRewards = await this.prisma.userContentReward.findMany({
      where: {
        id: { in: rewardIds },
        userId,
      },
    });

    if (userContentRewards.length !== rewardIds.length) {
      throw new Error('일부 리워드에 대한 수정 권한이 없습니다');
    }

    return true;
  }

  async validateUserContentSeeMoreRewards(rewardIds: number[]) {
    const userId = this.getUserId();

    const userContentSeeMoreRewards =
      await this.prisma.userContentSeeMoreReward.findMany({
        where: { id: { in: rewardIds }, userId },
      });

    if (userContentSeeMoreRewards.length !== rewardIds.length) {
      throw new Error('일부 리워드에 대한 수정 권한이 없습니다');
    }

    return true;
  }

  async validateUserContentRewardItem(rewardItemId: number) {
    const userId = this.getUserId();

    const userContentRewardItem =
      await this.prisma.userContentRewardItem.findUnique({
        where: { id: rewardItemId, userId },
      });

    if (!userContentRewardItem) {
      throw new Error('리워드 아이템에 대한 수정 권한이 없습니다');
    }

    return true;
  }

  async validateUserContentDuration(durationId: number) {
    const userId = this.getUserId();

    const userContentDuration =
      await this.prisma.userContentDuration.findUnique({
        where: {
          id: durationId,
          userId,
        },
      });

    if (!userContentDuration) {
      throw new Error('소요시간에 대한 수정 권한이 없습니다');
    }

    return true;
  }
}
