import { Injectable } from "@nestjs/common";
import { Content, Prisma } from "@prisma/client";
import { createPageInfo, decodeCursor, encodeCursor } from "src/common/pagination/helpers";
import { DEFAULT_PAGE_SIZE } from "src/common/pagination/constants";
import { NotFoundException } from "src/common/exception";
import { PrismaService } from "src/prisma";
import { ConnectionArgs } from "../args/connection.args";
import { ContentFilterArgs, CreateContentInput, UpdateContentInput } from "../dto";
import { ContentConnection } from "../object/content-connection.object";

const RAID_CATEGORY_NAMES = ["에픽 레이드", "카제로스 레이드", "강습 레이드", "군단장 레이드"];

const DEFAULT_ORDER_BY: Prisma.ContentOrderByWithRelationInput[] = [
  { contentCategory: { id: "asc" } },
  { level: "asc" },
  { id: "asc" },
];

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateContentInput): Promise<Content> {
    const { categoryId, contentRewards, contentSeeMoreRewards, duration, gate, level, name } =
      input;

    // 카테고리 정보 조회하여 레이드 여부 확인
    const category = await this.prisma.contentCategory.findUniqueOrThrow({
      where: { id: categoryId },
    });

    // TODO: 레이드 유형인지 판단하여 더보기 보상 생성 여부를 판단하는데, 구조적으로 더 나은 방법 검토 필요.
    const isRaid = RAID_CATEGORY_NAMES.includes(category.name);

    return this.prisma.content.create({
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
  }

  async delete(id: number): Promise<Content> {
    await this.findUniqueOrThrow(id);

    return this.prisma.content.delete({
      where: { id },
    });
  }

  async findAll(filter?: ContentFilterArgs): Promise<Content[]> {
    return this.prisma.content.findMany({
      orderBy: DEFAULT_ORDER_BY,
      where: this.buildWhereClause(filter),
    });
  }

  async findConnection(
    args: ConnectionArgs,
    filter?: ContentFilterArgs
  ): Promise<ContentConnection> {
    const { after, first = DEFAULT_PAGE_SIZE } = args;

    let afterId: number | undefined;
    if (after) {
      afterId = decodeCursor(after);
    }

    const where = this.buildWhereClause(filter);

    const totalCount = await this.prisma.content.count({ where });

    const items = await this.prisma.content.findMany({
      cursor: afterId ? { id: afterId } : undefined,
      orderBy: DEFAULT_ORDER_BY,
      skip: afterId ? 1 : 0,
      take: first + 1,
      where,
    });

    const { nodes, pageInfo } = createPageInfo(items, { after, first });

    const edges = nodes.map((node) => ({
      cursor: encodeCursor(node.id),
      node,
    }));

    return {
      edges,
      pageInfo,
      totalCount,
    };
  }

  async findUnique(id: number): Promise<Content | null> {
    return this.prisma.content.findUnique({
      where: { id },
    });
  }

  async findUniqueOrThrow(id: number): Promise<Content> {
    const content = await this.prisma.content.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException("Content", id);
    }

    return content;
  }

  async update(id: number, input: UpdateContentInput): Promise<Content> {
    await this.findUniqueOrThrow(id);

    return this.prisma.content.update({
      data: {
        gate: input.gate,
        level: input.level,
        name: input.name,
        status: input.status,
      },
      where: { id },
    });
  }

  private buildWhereClause(filter?: ContentFilterArgs): Prisma.ContentWhereInput {
    if (!filter) {
      return {};
    }

    const where: Prisma.ContentWhereInput = {};

    if (filter.categoryId !== undefined) {
      where.contentCategoryId = filter.categoryId;
    }

    if (filter.gate !== undefined) {
      where.gate = filter.gate;
    }

    if (filter.ids !== undefined) {
      where.id = {
        in: filter.ids,
      };
    }

    if (filter.level !== undefined) {
      where.level = filter.level;
    }

    if (filter.name !== undefined) {
      where.name = {
        contains: filter.name,
        mode: "insensitive",
      };
    }

    if (filter.status !== undefined) {
      where.status = filter.status;
    }

    return where;
  }
}
