import { BadRequestException, Injectable } from "@nestjs/common";
import { Content, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma";

export type ContentGroupFilterArgs = {
  contentIds?: number[];
};

export type ContentGroup = {
  contentCategoryId: number;
  contentIds: number[];
  level: number;
  name: string;
};

const DEFAULT_ORDER_BY: Prisma.ContentOrderByWithRelationInput[] = [
  { contentCategory: { id: "asc" } },
  { level: "asc" },
  { id: "asc" },
];

@Injectable()
export class ContentGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filter?: ContentGroupFilterArgs): Promise<Content[]> {
    return this.prisma.content.findMany({
      orderBy: DEFAULT_ORDER_BY,
      where: filter ? this.buildWhereClause(filter) : undefined,
    });
  }

  async findOne(filter: ContentGroupFilterArgs): Promise<ContentGroup> {
    const contents = await this.prisma.content.findMany({
      orderBy: DEFAULT_ORDER_BY,
      where: this.buildWhereClause(filter),
    });

    // 유효성 검증
    this.validateContentGroup(contents);

    return {
      contentCategoryId: contents[0].contentCategoryId,
      contentIds: contents.map((content) => content.id),
      level: contents[0].level,
      name: contents[0].name,
    };
  }

  private buildWhereClause(filter: ContentGroupFilterArgs): Prisma.ContentWhereInput {
    const where: Prisma.ContentWhereInput = {};

    if (filter.contentIds && filter.contentIds.length > 0) {
      where.id = {
        in: filter.contentIds,
      };
    }

    return where;
  }

  private validateContentGroup(contents: Content[]): void {
    if (contents.length === 0) {
      throw new BadRequestException("Content group is empty");
    }

    const firstContent = contents[0];

    for (const content of contents) {
      if (content.level !== firstContent.level) {
        throw new BadRequestException("Content level is not the same");
      }

      if (content.contentCategoryId !== firstContent.contentCategoryId) {
        throw new BadRequestException("Content category is not the same");
      }
    }
  }
}
