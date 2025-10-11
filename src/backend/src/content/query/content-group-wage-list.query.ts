import { Args, Field, InputType, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma";
import { ContentStatus, Prisma } from "@prisma/client";
import { ContentWageService } from "../service/content-wage.service";
import { ContentWageFilter } from "../object/content-wage.object";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import _ from "lodash";
import { ContentGroupWage } from "../object/content-group-wage.object";

@InputType()
export class ContentGroupWageListFilter extends ContentWageFilter {
  @Field({ nullable: true })
  contentCategoryId?: number;

  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => ContentStatus, { nullable: true })
  status?: ContentStatus;
}

@Resolver()
export class ContentGroupWageListQuery {
  constructor(
    private prisma: PrismaService,
    private contentWageService: ContentWageService
  ) {}

  buildWhereArgs(filter?: ContentGroupWageListFilter) {
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

  @Query(() => [ContentGroupWage])
  async contentGroupWageList(
    @Args("filter", { nullable: true }) filter?: ContentGroupWageListFilter,
    @Args("orderBy", {
      nullable: true,
      type: () => [OrderByArg],
    })
    orderBy?: OrderByArg[]
  ) {
    const contents = await this.prisma.content.findMany({
      include: {
        contentCategory: true,
        contentSeeMoreRewards: {
          include: {
            item: true,
          },
        },
      },
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
      where: this.buildWhereArgs(filter),
    });

    const contentGroups = _.groupBy(
      contents,
      (content) => `${content.name}_${content.contentCategoryId}`
    );

    const promises = Object.entries(contentGroups).map(async ([_, groupContents]) => {
      const contentIds = groupContents.map((content) => content.id);

      const representative = groupContents[0];

      const wage = await this.contentWageService.getContentGroupWage(contentIds, {
        includeIsBound: filter?.includeIsBound,
        includeIsSeeMore: filter?.includeIsSeeMore,
        includeItemIds: filter?.includeItemIds,
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

    const result = orderBy
      ? _.orderBy(
          await Promise.all(promises),
          orderBy.map((order) => order.field),
          orderBy.map((order) => order.order)
        )
      : await Promise.all(promises);

    return result;
  }
}
