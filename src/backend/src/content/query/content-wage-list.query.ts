import { Args, Field, InputType, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma";
import { ContentStatus, Prisma } from "@prisma/client";
import { ContentWageService } from "../service/content-wage.service";
import { ContentWage, ContentWageFilter } from "../object/content-wage.object";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import _ from "lodash";

@InputType()
export class ContentWageListFilter extends ContentWageFilter {
  @Field({ nullable: true })
  contentCategoryId?: number;

  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => ContentStatus, { nullable: true })
  status?: ContentStatus;
}

@Resolver()
export class ContentWageListQuery {
  constructor(
    private prisma: PrismaService,
    private contentWageService: ContentWageService
  ) {}

  buildWhereArgs(filter?: ContentWageListFilter) {
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

  @Query(() => [ContentWage])
  async contentWageList(
    @Args("filter", { nullable: true }) filter?: ContentWageListFilter,
    @Args("orderBy", {
      nullable: true,
      type: () => [OrderByArg],
    })
    orderBy?: OrderByArg[]
  ) {
    const contents = await this.prisma.content.findMany({
      include: {
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

    const promises = contents.map(async (content) => {
      return await this.contentWageService.getContentWage(content.id, {
        includeIsBound: filter?.includeIsBound,
        includeIsSeeMore: filter?.includeIsSeeMore,
        includeItemIds: filter?.includeItemIds,
      });
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
