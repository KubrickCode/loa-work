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
  async getItemPrice(itemId: number) {
    const userId = this.getUserId();

    const { price: defaultPrice } = await this.prisma.item.findUniqueOrThrow({
      where: {
        id: itemId,
      },
    });

    const { isEditable } = await this.prisma.item.findUniqueOrThrow({
      where: {
        id: itemId,
      },
    });

    const price =
      userId && isEditable
        ? (
            await this.prisma.userItem.findUniqueOrThrow({
              where: {
                userId_itemId: {
                  userId,
                  itemId,
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
      includeItemIds?: number[];
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
            ...(filter?.includeItemIds && {
              itemId: { in: filter.includeItemIds },
            }),
          },
        },
        include: {
          contentReward: true,
        },
      });

      return userRewards.map(({ averageQuantity, contentReward }) => ({
        averageQuantity: averageQuantity.toNumber(),
        itemId: contentReward.itemId,
      }));
    }

    const where = {
      contentId,
      ...(filter?.includeIsBound === false && { isSellable: true }),
      ...(filter?.includeItemIds && {
        itemId: { in: filter.includeItemIds },
      }),
    };

    const defaultRewards = await this.prisma.contentReward.findMany({
      where,
    });

    return defaultRewards.map(({ defaultAverageQuantity, itemId }) => ({
      averageQuantity: defaultAverageQuantity.toNumber(),
      itemId,
    }));
  }

  async getContentSeeMoreRewards(
    contentId: number,
    filter?: {
      includeItemIds?: number[];
    },
  ) {
    const userId = this.getUserId();

    const where = {
      contentId,
      ...(filter?.includeItemIds && {
        itemId: { in: filter.includeItemIds },
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
        itemId: contentSeeMoreReward.itemId,
      }));
    }

    const defaultRewards = await this.prisma.contentSeeMoreReward.findMany({
      where,
    });

    return defaultRewards.map(({ quantity, itemId }) => ({
      quantity: quantity.toNumber(),
      itemId,
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

  async validateUserItem(itemId: number) {
    const userId = this.getUserId();

    const userItem = await this.prisma.userItem.findUnique({
      where: { id: itemId, userId },
    });

    if (!userItem) {
      throw new Error('아이템에 대한 수정 권한이 없습니다');
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
