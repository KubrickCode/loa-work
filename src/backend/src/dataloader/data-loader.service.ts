import _ from 'lodash';
import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import {
  ContentCategory,
  ContentDuration,
  ContentRewardItem,
} from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderService {
  readonly contentCategory = this.createContentCategoryLoader();
  readonly contentDuration = this.createContentDurationLoader();
  readonly contentRewards = this.createContentRewardsLoader();
  readonly contentRewardItem = this.createContentRewardItemLoader();
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

  private createContentDurationLoader() {
    const contentDurationLoader = new DataLoader<number, ContentDuration>(
      async (contentIds) => {
        const durations = await this.prisma.contentDuration.findMany({
          where: {
            contentId: { in: contentIds as number[] },
          },
        });

        const durationsMap = _.keyBy(durations, 'contentId');

        return contentIds.map((id) => durationsMap[id]);
      },
    );

    return {
      findUniqueOrThrowByContentId: async (contentId: number) => {
        const result = await contentDurationLoader.load(contentId);
        if (!result) {
          throw new Error(
            `ContentDuration for contentId ${contentId} not found`,
          );
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
        });

        const rewardsGrouped = _.groupBy(rewards, 'contentId');

        return contentIds.map((id) => rewardsGrouped[id] || []);
      },
    );

    return {
      findManyByContentId: async (contentId: number) => {
        return await contentRewardsLoader.load(contentId);
      },
    };
  }

  private createContentRewardItemLoader() {
    const contentRewardItemLoader = new DataLoader<number, ContentRewardItem>(
      async (itemIds) => {
        const items = await this.prisma.contentRewardItem.findMany({
          where: {
            id: { in: itemIds as number[] },
          },
        });

        const itemsMap = _.keyBy(items, 'id');

        return itemIds.map((id) => itemsMap[id]);
      },
    );

    return {
      findUniqueOrThrowById: async (itemId: number) => {
        const result = await contentRewardItemLoader.load(itemId);
        if (!result) {
          throw new Error(`ContentRewardItem with id ${itemId} not found`);
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
        });

        const rewardsGrouped = _.groupBy(rewards, 'contentId');

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
