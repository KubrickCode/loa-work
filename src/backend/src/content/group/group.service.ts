import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { groupBy, sum } from "es-toolkit";
import { orderBy } from "es-toolkit/compat";
import { ValidationException } from "src/common/exception";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { PrismaService } from "src/prisma";
import { UserContentService } from "src/user/service/user-content.service";
import { DEFAULT_CONTENT_ORDER_BY } from "../shared/constants";
import { ContentWageService } from "../wage/wage.service";
import { ContentGroupFilter, ContentGroupWageListFilter } from "./group.dto";
import { ContentGroup, ContentGroupWage } from "./group.object";

type ContentGroupable = {
  contentCategoryId: number;
  id: number;
  level: number;
  name: string;
};

@Injectable()
export class GroupService {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
    private contentWageService: ContentWageService
  ) {}

  buildContentGroupWageListWhere(filter?: ContentGroupWageListFilter): Prisma.ContentWhereInput {
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

  buildContentGroupWhere(filter?: ContentGroupFilter): Prisma.ContentWhereInput {
    const where: Prisma.ContentWhereInput = {};

    if (filter?.contentIds) {
      where.id = {
        in: filter.contentIds,
      };
    }

    return where;
  }

  async calculateGroupDuration(contentIds: number[]): Promise<number> {
    const durations = await Promise.all(
      contentIds.map((contentId) => this.userContentService.getContentDuration(contentId))
    );

    return sum(durations);
  }

  async findContentGroup(filter?: ContentGroupFilter): Promise<ContentGroup> {
    const contents = await this.prisma.content.findMany({
      orderBy: this.getContentOrderBy(),
      where: this.buildContentGroupWhere(filter),
    });

    this.validateContentGroup(contents);

    return {
      contentCategoryId: contents[0].contentCategoryId,
      contentIds: contents.map((content) => content.id),
      level: contents[0].level,
      name: contents[0].name,
    };
  }

  async findContentGroupWageList(
    filter?: ContentGroupWageListFilter,
    orderByArgs?: OrderByArg[],
    userId?: number
  ): Promise<ContentGroupWage[]> {
    const contents = await this.prisma.content.findMany({
      include: {
        contentCategory: true,
        contentSeeMoreRewards: {
          include: {
            item: true,
          },
        },
      },
      orderBy: this.getContentOrderBy(),
      where: this.buildContentGroupWageListWhere(filter),
    });

    const contentGroups = this.groupContentsByNameAndCategory(contents);

    const promises = Object.values(contentGroups).map(async (groupContents) => {
      const contentIds = groupContents.map((content) => content.id);
      const representative = groupContents[0];

      const wage = await this.contentWageService.getContentGroupWage(contentIds, userId, {
        includeBound: filter?.includeBound,
        includeItemIds: filter?.includeItemIds,
        includeSeeMore: filter?.includeSeeMore,
      });

      return {
        contentGroup: {
          contentCategoryId: representative.contentCategoryId,
          contentIds,
          level: representative.level,
          name: representative.name,
        },
        ...wage,
      };
    });

    const result = await Promise.all(promises);

    return orderByArgs ? this.sortResults(result, orderByArgs) : result;
  }

  async findContentsByIds(contentIds: number[]) {
    return await this.prisma.content.findMany({
      where: {
        id: { in: contentIds },
      },
    });
  }

  groupContentsByNameAndCategory<T extends ContentGroupable>(contents: T[]): Record<string, T[]> {
    return groupBy(contents, (content) => `${content.name}_${content.contentCategoryId}`);
  }

  validateContentGroup(contents: ContentGroupable[]): void {
    if (contents.length === 0) {
      return;
    }

    const firstContent = contents[0];

    for (const content of contents) {
      if (content.level !== firstContent.level) {
        throw new ValidationException("Content level is not the same", "level");
      }

      if (content.contentCategoryId !== firstContent.contentCategoryId) {
        throw new ValidationException("Content category is not the same", "contentCategoryId");
      }
    }
  }

  private getContentOrderBy(): Prisma.ContentOrderByWithRelationInput[] {
    return DEFAULT_CONTENT_ORDER_BY;
  }

  private sortResults(results: ContentGroupWage[], orderByArgs: OrderByArg[]): ContentGroupWage[] {
    return orderBy(
      results,
      orderByArgs.map((o) => o.field),
      orderByArgs.map((o) => o.order)
    );
  }
}
