import { Inject, Injectable, UseGuards } from "@nestjs/common";
import { PrismaService } from "../../prisma";
import { CONTEXT } from "@nestjs/graphql";
import { ContextType } from "./types";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Injectable()
export class UserContentService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CONTEXT) private context: ContextType
  ) {}

  async getContentDuration(contentId: number) {
    const userId = this.getUserId();

    const contentDuration = await this.prisma.contentDuration.findUniqueOrThrow({
      where: {
        contentId,
      },
    });

    if (userId) {
      const userContentDuration = await this.prisma.userContentDuration.findUnique({
        where: {
          contentId_userId: {
            contentId,
            userId,
          },
        },
      });

      return userContentDuration ? userContentDuration.value : contentDuration.value;
    }

    return contentDuration.value;
  }

  async getContentRewardAverageQuantity(contentRewardId: number) {
    const userId = this.getUserId();

    const contentReward = await this.prisma.contentReward.findUniqueOrThrow({
      where: {
        id: contentRewardId,
      },
    });

    if (userId) {
      const userContentReward = await this.prisma.userContentReward.findUnique({
        where: {
          userId_contentId_itemId: {
            contentId: contentReward.contentId,
            itemId: contentReward.itemId,
            userId,
          },
        },
      });

      return userContentReward ? userContentReward.averageQuantity : contentReward.averageQuantity;
    }

    return contentReward.averageQuantity;
  }

  async getContentRewardIsSellable(contentRewardId: number) {
    const userId = this.getUserId();

    const contentReward = await this.prisma.contentReward.findUniqueOrThrow({
      where: { id: contentRewardId },
    });

    if (userId) {
      const userContentReward = await this.prisma.userContentReward.findUnique({
        where: {
          userId_contentId_itemId: {
            contentId: contentReward.contentId,
            itemId: contentReward.itemId,
            userId,
          },
        },
      });

      return userContentReward ? userContentReward.isSellable : contentReward.isSellable;
    }

    return contentReward.isSellable;
  }

  async getContentRewards(
    contentId: number,
    filter?: {
      includeIsBound?: boolean;
      includeItemIds?: number[];
    }
  ) {
    const userId = this.getUserId();

    const where = {
      contentId,
      ...(filter?.includeItemIds && {
        itemId: { in: filter.includeItemIds },
      }),
    };

    const defaultRewards = await this.prisma.contentReward.findMany({
      where,
    });

    let result: {
      averageQuantity: number;
      isSellable: boolean;
      itemId: number;
    }[];

    if (userId) {
      const userRewards = await this.prisma.userContentReward.findMany({
        where: {
          contentId,
          userId,
          ...(filter?.includeItemIds && {
            itemId: { in: filter.includeItemIds },
          }),
        },
      });

      const userRewardMap = new Map(userRewards.map((reward) => [reward.itemId, reward]));

      result = defaultRewards.map(({ averageQuantity, isSellable, itemId }) => {
        const userReward = userRewardMap.get(itemId);

        if (userReward) {
          return {
            averageQuantity: userReward.averageQuantity.toNumber(),
            isSellable: userReward.isSellable,
            itemId,
          };
        } else {
          return {
            averageQuantity: averageQuantity.toNumber(),
            isSellable,
            itemId,
          };
        }
      });
    } else {
      result = defaultRewards.map(({ averageQuantity, isSellable, itemId }) => ({
        averageQuantity: averageQuantity.toNumber(),
        isSellable,
        itemId,
      }));
    }

    return result.filter((item) => {
      if (filter?.includeIsBound === false) {
        return item.isSellable;
      }
      return true;
    });
  }

  async getContentSeeMoreRewardQuantity(contentSeeMoreRewardId: number) {
    const userId = this.getUserId();

    const contentSeeMoreReward = await this.prisma.contentSeeMoreReward.findUniqueOrThrow({
      where: { id: contentSeeMoreRewardId },
    });

    if (userId) {
      const userContentSeeMoreReward = await this.prisma.userContentSeeMoreReward.findUnique({
        where: {
          userId_contentId_itemId: {
            contentId: contentSeeMoreReward.contentId,
            itemId: contentSeeMoreReward.itemId,
            userId,
          },
        },
      });

      return userContentSeeMoreReward
        ? userContentSeeMoreReward.quantity
        : contentSeeMoreReward.quantity;
    }

    return contentSeeMoreReward.quantity;
  }

  async getContentSeeMoreRewards(
    contentId: number,
    filter?: {
      includeItemIds?: number[];
    }
  ) {
    const userId = this.getUserId();

    const where = {
      contentId,
      ...(filter?.includeItemIds && {
        itemId: { in: filter.includeItemIds },
      }),
    };

    const defaultRewards = await this.prisma.contentSeeMoreReward.findMany({
      where,
    });

    if (userId) {
      const userRewards = await this.prisma.userContentSeeMoreReward.findMany({
        where: {
          contentId,
          userId,
          ...(filter?.includeItemIds && {
            itemId: { in: filter.includeItemIds },
          }),
        },
      });

      const userRewardMap = new Map(userRewards.map((reward) => [reward.itemId, reward]));

      return defaultRewards.map(({ itemId, quantity }) => {
        const userReward = userRewardMap.get(itemId);
        return {
          itemId,
          quantity: userReward ? userReward.quantity.toNumber() : quantity.toNumber(),
        };
      });
    }

    return defaultRewards.map(({ itemId, quantity }) => ({
      itemId,
      quantity: quantity.toNumber(),
    }));
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
                  itemId,
                  userId,
                },
              },
            })
          ).price
        : defaultPrice;

    return price.toNumber();
  }

  getUserId() {
    return this.context.req?.user?.id;
  }

  async validateUserItem(itemId: number) {
    const userId = this.getUserId();

    const userItem = await this.prisma.userItem.findUnique({
      where: { id: itemId, userId },
    });

    if (!userItem) {
      throw new Error("아이템에 대한 수정 권한이 없습니다");
    }

    return true;
  }
}
