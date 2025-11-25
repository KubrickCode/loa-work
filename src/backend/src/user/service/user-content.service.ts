import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma";

@Injectable()
export class UserContentService {
  constructor(private readonly prisma: PrismaService) {}

  async getContentDuration(contentId: number, userId?: number) {
    return this.getUserOverride(
      userId,
      () =>
        this.prisma.contentDuration.findUniqueOrThrow({
          where: { contentId },
        }),
      (userId) =>
        this.prisma.userContentDuration.findUnique({
          where: { contentId_userId: { contentId, userId } },
        }),
      (entity) => entity.value
    );
  }

  async getContentRewardAverageQuantity(contentRewardId: number, userId?: number) {
    const contentReward = await this.prisma.contentReward.findUniqueOrThrow({
      where: { id: contentRewardId },
    });

    return this.getUserOverride(
      userId,
      () => Promise.resolve(contentReward),
      (userId) =>
        this.prisma.userContentReward.findUnique({
          where: {
            userId_contentId_itemId: {
              contentId: contentReward.contentId,
              itemId: contentReward.itemId,
              userId,
            },
          },
        }),
      (entity) => entity.averageQuantity
    );
  }

  async getContentRewardIsSellable(contentRewardId: number, userId?: number) {
    const contentReward = await this.prisma.contentReward.findUniqueOrThrow({
      where: { id: contentRewardId },
    });

    return this.getUserOverride(
      userId,
      () => Promise.resolve(contentReward),
      (userId) =>
        this.prisma.userContentReward.findUnique({
          where: {
            userId_contentId_itemId: {
              contentId: contentReward.contentId,
              itemId: contentReward.itemId,
              userId,
            },
          },
        }),
      (entity) => entity.isSellable
    );
  }

  async getContentRewards(
    contentId: number,
    userId?: number,
    filter?: {
      includeBound?: boolean;
      includeItemIds?: number[];
    }
  ) {
    const where = {
      contentId,
      ...(filter?.includeItemIds && {
        itemId: { in: filter.includeItemIds },
      }),
    };

    const defaultRewards = await this.prisma.contentReward.findMany({
      where,
    });

    type RewardResult = {
      averageQuantity: number;
      isSellable: boolean;
      itemId: number;
    };

    let result: RewardResult[];

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
      if (filter?.includeBound === false) {
        return item.isSellable;
      }
      return true;
    });
  }

  async getContentSeeMoreRewardQuantity(contentSeeMoreRewardId: number, userId?: number) {
    const contentSeeMoreReward = await this.prisma.contentSeeMoreReward.findUniqueOrThrow({
      where: { id: contentSeeMoreRewardId },
    });

    return this.getUserOverride(
      userId,
      () => Promise.resolve(contentSeeMoreReward),
      (userId) =>
        this.prisma.userContentSeeMoreReward.findUnique({
          where: {
            userId_contentId_itemId: {
              contentId: contentSeeMoreReward.contentId,
              itemId: contentSeeMoreReward.itemId,
              userId,
            },
          },
        }),
      (entity) => entity.quantity
    );
  }

  async getContentSeeMoreRewards(
    contentId: number,
    userId?: number,
    filter?: {
      includeItemIds?: number[];
    }
  ) {
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

  async getItemPrice(itemId: number, userId?: number) {
    const item = await this.prisma.item.findUniqueOrThrow({
      where: { id: itemId },
    });

    if (!userId || !item.isEditable) {
      return item.price.toNumber();
    }

    const userItem = await this.prisma.userItem.findUniqueOrThrow({
      where: { userId_itemId: { itemId, userId } },
    });

    return userItem.price.toNumber();
  }

  async validateUserItem(itemId: number, userId: number) {
    const userItem = await this.prisma.userItem.findUnique({
      where: { id: itemId, userId },
    });

    if (!userItem) {
      throw new Error("아이템에 대한 수정 권한이 없습니다");
    }

    return true;
  }

  private async getUserOverride<TDefault, TUser, TValue>(
    userId: number | undefined,
    fetchDefault: () => Promise<TDefault>,
    fetchUserOverride: (userId: number) => Promise<TUser | null>,
    extractValue: (source: TDefault | TUser) => TValue
  ): Promise<TValue> {
    const defaultEntity = await fetchDefault();

    if (!userId) {
      return extractValue(defaultEntity);
    }

    const userEntity = await fetchUserOverride(userId);
    return userEntity ? extractValue(userEntity) : extractValue(defaultEntity);
  }
}
