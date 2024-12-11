import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CONTEXT } from '@nestjs/graphql';

type ContextType = { req?: { user?: { id: number } } };

@Injectable()
export class UserContentService {
  private readonly userId?: number;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(CONTEXT) context: ContextType,
  ) {
    this.userId = context.req?.user?.id;
  }

  async getContentRewardItemPrice(contentRewardItemId: number) {
    const contentRewardItem =
      await this.prisma.contentRewardItem.findUniqueOrThrow({
        where: {
          id: contentRewardItemId,
        },
      });

    const price = this.userId
      ? (
          await this.prisma.userContentRewardItem.findUniqueOrThrow({
            where: {
              userId_contentRewardItemId: {
                userId: this.userId,
                contentRewardItemId,
              },
            },
          })
        ).price
      : contentRewardItem.defaultPrice;

    return price.toNumber();
  }

  async getContentDuration(contentId: number) {
    const contentDuration = await this.prisma.contentDuration.findUniqueOrThrow(
      {
        where: {
          contentId,
        },
      },
    );

    return this.userId
      ? (
          await this.prisma.userContentDuration.findUniqueOrThrow({
            where: {
              contentDurationId_userId: {
                contentDurationId: contentDuration.id,
                userId: this.userId,
              },
            },
          })
        ).value
      : contentDuration.defaultValue;
  }

  async getContentRewardAverageQuantity(contentRewardId: number) {
    const contentReward = await this.prisma.contentReward.findUniqueOrThrow({
      where: {
        id: contentRewardId,
      },
    });

    return this.userId
      ? (
          await this.prisma.userContentReward.findUniqueOrThrow({
            where: {
              userId_contentRewardId: {
                userId: this.userId,
                contentRewardId,
              },
            },
          })
        ).averageQuantity
      : contentReward.defaultAverageQuantity;
  }
}
