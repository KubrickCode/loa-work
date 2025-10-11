import { Args, Field, InputType, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma";
import { Content } from "../object/content.object";
import { ContentStatus, Prisma } from "@prisma/client";
import _ from "lodash";

@InputType()
export class ContentListFilter {
  @Field({ nullable: true })
  contentCategoryId?: number;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => ContentStatus, { nullable: true })
  status?: ContentStatus;
}

@Resolver()
export class ContentListQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Content])
  async contentList(@Args("filter", { nullable: true }) filter?: ContentListFilter) {
    return await this.prisma.content.findMany({
      where: this.buildWhereArgs(filter),
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
    });
  }

  buildWhereArgs(filter?: ContentListFilter) {
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
}
