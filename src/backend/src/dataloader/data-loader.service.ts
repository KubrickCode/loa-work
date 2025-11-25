import { Injectable, Scope } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma";
import {
  ContentRewardWithItem,
  ContentSeeMoreRewardWithItem,
  ManyLoader,
  UniqueLoader,
} from "./data-loader.types";
import { createManyLoader, createUniqueLoader } from "./data-loader.utils";

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderService {
  readonly contentCategory: UniqueLoader<Prisma.ContentCategoryGetPayload<object>>;
  readonly contentRewards: ManyLoader<ContentRewardWithItem>;
  readonly contentSeeMoreRewards: ManyLoader<ContentSeeMoreRewardWithItem>;
  readonly item: UniqueLoader<Prisma.ItemGetPayload<object>>;

  constructor(private prisma: PrismaService) {
    this.contentCategory = createUniqueLoader(
      (ids) => this.prisma.contentCategory.findMany({ where: { id: { in: [...ids] } } }),
      "ContentCategory"
    );

    this.contentRewards = createManyLoader<ContentRewardWithItem>((ids) =>
      this.prisma.contentReward.findMany({
        include: { item: true },
        where: { contentId: { in: [...ids] } },
      })
    );

    this.contentSeeMoreRewards = createManyLoader<ContentSeeMoreRewardWithItem>((ids) =>
      this.prisma.contentSeeMoreReward.findMany({
        include: { item: true },
        where: { contentId: { in: [...ids] } },
      })
    );

    this.item = createUniqueLoader(
      (ids) => this.prisma.item.findMany({ where: { id: { in: [...ids] } } }),
      "Item"
    );
  }
}
