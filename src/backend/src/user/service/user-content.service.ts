import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CONTEXT } from '@nestjs/graphql';
import { ContextType } from './types';

@Injectable()
export class UserContentService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CONTEXT) private context: ContextType,
  ) {}

  private getUserId() {
    return this.context.req?.user?.id;
  }

  async getContentRewardItemPrice(contentRewardItemId: number) {
    const userId = this.getUserId();

    const contentRewardItem =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: {
          id: contentRewardItemId,
        },
      });

    const price = userId
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
      : contentRewardItem.defaultPrice;

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

  async getContentRewards(
    contentId: number,
    filter?: {
      includeIsBound?: boolean;
      includeContentRewardItemIds?: number[];
    },
  ) {
    const userId = this.getUserId();

    const where = {
      contentId,
      ...(filter?.includeIsBound === false && { isSellable: true }),
      ...(filter?.includeContentRewardItemIds && {
        contentRewardItemId: { in: filter.includeContentRewardItemIds },
      }),
    };

    if (userId) {
      const userRewards = await this.prisma.userContentReward.findMany({
        where: {
          userId,
          contentReward: where,
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
