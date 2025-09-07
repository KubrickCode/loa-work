import _ from 'lodash';
import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ContentCategory, Item } from '@prisma/client';
import { ItemSortOrder } from 'src/content/constants';

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderService {
  readonly contentCategory = this.createContentCategoryLoader();
  readonly contentRewards = this.createContentRewardsLoader();
  readonly item = this.createItemLoader();
  readonly contentSeeMoreRewards = this.createContentSeeMoreRewardsLoader();

  constructor(private prisma: PrismaService) {}

  private createContentCategoryLoader() {
    const contentCategoryLoader = new DataLoader<number, ContentCategory>(
      async (categoryIds) => {
        const categories = await this.prisma.contentCategory.findMany({
          where: {
            id: { in: categoryIds as number[] },
          },
        });

        const categoriesMap = _.keyBy(categories, 'id');

        return categoryIds.map((id) => categoriesMap[id]);
      },
    );

    return {
      findUniqueOrThrowById: async (categoryId: number) => {
        const result = await contentCategoryLoader.load(categoryId);
        if (!result) {
          throw new Error(`ContentCategory with id ${categoryId} not found`);
        }
        return result;
      },
    };
  }

  private createContentRewardsLoader() {
    const contentRewardsLoader = new DataLoader<number, any[]>(
      async (contentIds) => {
        const rewards = await this.prisma.contentReward.findMany({
          where: {
            contentId: { in: contentIds as number[] },
          },
          include: {
            item: true,
          },
        });

        const sortedRewards = _.cloneDeep(rewards).sort((a, b) => {
          const aOrder = ItemSortOrder[a.item.name] || 999;
          const bOrder = ItemSortOrder[b.item.name] || 999;
          return aOrder - bOrder;
        });

        const rewardsGrouped = _.groupBy(sortedRewards, 'contentId');

        return contentIds.map((id) => rewardsGrouped[id] || []);
      },
    );

    return {
      findManyByContentId: async (contentId: number) => {
        return await contentRewardsLoader.load(contentId);
      },
    };
  }

  private createItemLoader() {
    const itemLoader = new DataLoader<number, Item>(async (itemIds) => {
      const items = await this.prisma.item.findMany({
        where: {
          id: { in: itemIds as number[] },
        },
      });

      const itemsMap = _.keyBy(items, 'id');

      return itemIds.map((id) => itemsMap[id]);
    });

    return {
      findUniqueOrThrowById: async (itemId: number) => {
        const result = await itemLoader.load(itemId);
        if (!result) {
          throw new Error(`Item with id ${itemId} not found`);
        }
        return result;
      },
    };
  }

  private createContentSeeMoreRewardsLoader() {
    const contentSeeMoreRewardsLoader = new DataLoader<number, any[]>(
      async (contentIds) => {
        const rewards = await this.prisma.contentSeeMoreReward.findMany({
          where: {
            contentId: { in: contentIds as number[] },
          },
          include: {
            item: true,
          },
        });

        const sortedRewards = _.cloneDeep(rewards).sort((a, b) => {
          const aOrder = ItemSortOrder[a.item.name] || 999;
          const bOrder = ItemSortOrder[b.item.name] || 999;
          return aOrder - bOrder;
        });

        const rewardsGrouped = _.groupBy(sortedRewards, 'contentId');

        return contentIds.map((id) => rewardsGrouped[id] || []);
      },
    );

    return {
      findManyByContentId: async (contentId: number) => {
        return await contentSeeMoreRewardsLoader.load(contentId);
      },
    };
  }
}
