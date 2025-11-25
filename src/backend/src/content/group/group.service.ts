import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import _ from "lodash";
import { ValidationException } from "src/common/exception";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { PrismaService } from "src/prisma";
import { UserContentService } from "src/user/service/user-content.service";
import { DEFAULT_CONTENT_ORDER_BY } from "../shared/constants";
import { ContentWageService } from "../wage/wage.service";
import { ContentGroupFilter, ContentGroupWageListFilter } from "./group.dto";
import { ContentGroup, ContentGroupWage } from "./group.object";

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
    let duration = 0;

    for (const contentId of contentIds) {
      const contentDuration = await this.userContentService.getContentDuration(contentId);
      duration += contentDuration;
    }

    return duration;
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
    orderBy?: OrderByArg[],
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

    const promises = Array.from(contentGroups.entries()).map(async ([_, groupContents]) => {
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

    return orderBy ? this.sortResults(result, orderBy) : result;
  }

  async findContentsByIds(contentIds: number[]) {
    return await this.prisma.content.findMany({
      where: {
        id: { in: contentIds },
      },
    });
  }

  groupContentsByNameAndCategory(contents: any[]): Map<string, any[]> {
    const grouped = _.groupBy(
      contents,
      (content) => `${content.name}_${content.contentCategoryId}`
    );

    return new Map(Object.entries(grouped));
  }

  validateContentGroup(contents: any[]): void {
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

  private sortResults(results: ContentGroupWage[], orderBy: OrderByArg[]): ContentGroupWage[] {
    return _.orderBy(
      results,
      orderBy.map((order) => order.field),
      orderBy.map((order) => order.order)
    );
  }
}
