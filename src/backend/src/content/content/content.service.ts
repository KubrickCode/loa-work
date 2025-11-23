import { Injectable } from "@nestjs/common";
import { Content, Prisma } from "@prisma/client";
import { NotFoundException } from "src/common/exception/not-found.exception";
import { PrismaService } from "src/prisma";
import {
  ContentCreateInput,
  ContentCreateResult,
  ContentListFilter,
  ContentsFilter,
} from "./content.dto";

const RAID_CATEGORIES = ["에픽 레이드", "카제로스 레이드", "강습 레이드", "군단장 레이드"];

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  buildContentListWhere(filter?: ContentListFilter): Prisma.ContentWhereInput {
    const where: Prisma.ContentWhereInput = {};

    if (filter?.contentCategoryId) {
      where.contentCategoryId = filter.contentCategoryId;
    }

    if (filter?.keyword) {
      where.OR = [
        {
          name: {
            contains: filter.keyword,
            mode: "insensitive",
          },
        },
        {
          contentCategory: {
            name: {
              contains: filter.keyword,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    if (filter?.status) {
      where.status = filter.status;
    }

    return where;
  }

  buildContentsWhere(filter?: ContentsFilter): Prisma.ContentWhereInput {
    const where: Prisma.ContentWhereInput = {};

    if (filter?.ids) {
      where.id = {
        in: filter.ids,
      };
    }

    return where;
  }

  async createContent(input: ContentCreateInput): Promise<ContentCreateResult> {
    const { categoryId, contentRewards, contentSeeMoreRewards, duration, gate, level, name } =
      input;

    const category = await this.prisma.contentCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException("ContentCategory", categoryId);
    }

    const isRaid = this.isRaidCategory(category.name);

    await this.prisma.content.create({
      data: {
        contentCategoryId: categoryId,
        contentDuration: {
          create: {
            value: duration,
          },
        },
        contentRewards: {
          createMany: {
            data: contentRewards.map(({ averageQuantity, isBound, itemId }) => ({
              averageQuantity,
              isSellable: !isBound,
              itemId,
            })),
          },
        },
        ...(isRaid &&
          contentSeeMoreRewards?.length && {
            contentSeeMoreRewards: {
              createMany: {
                data: contentSeeMoreRewards.map(({ itemId, quantity }) => ({
                  itemId,
                  quantity,
                })),
              },
            },
          }),
        gate,
        level,
        name,
      },
    });

    return { ok: true };
  }

  async findContentById(id: number): Promise<Content> {
    const content = await this.prisma.content.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException("Content", id);
    }

    return content;
  }

  async findContentList(filter?: ContentListFilter): Promise<Content[]> {
    return await this.prisma.content.findMany({
      orderBy: [
        {
          contentCategory: {
            id: "asc",
          },
        },
        {
          level: "asc",
        },
        {
          id: "asc",
        },
      ],
      where: this.buildContentListWhere(filter),
    });
  }

  async findContents(filter?: ContentsFilter): Promise<Content[]> {
    return await this.prisma.content.findMany({
      orderBy: [
        {
          contentCategory: {
            id: "asc",
          },
        },
        {
          level: "asc",
        },
        {
          id: "asc",
        },
      ],
      where: this.buildContentsWhere(filter),
    });
  }

  isRaidCategory(categoryName: string): boolean {
    return RAID_CATEGORIES.includes(categoryName);
  }
}
