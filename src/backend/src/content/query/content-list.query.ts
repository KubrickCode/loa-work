import { Args, Field, InputType, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from '../object/content.object';
import { Prisma } from '@prisma/client';
import _ from 'lodash';

@InputType()
export class ContentListWageFilter {
  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;

  @Field(() => [String], { nullable: true })
  includeContentRewardItems?: string[];
}

@InputType()
export class ContentListFilter {
  @Field(() => Int, { nullable: true })
  contentCategoryId?: number;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => ContentListWageFilter, { nullable: true })
  wageFilter?: ContentListWageFilter;
}

@Resolver()
export class ContentListQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Content])
  async contentList(
    @Args('filter', { nullable: true }) filter?: ContentListFilter,
  ) {
    const contents = await this.prisma.content.findMany({
      where: this.buildWhereArgs(filter),
      orderBy: [
        {
          contentCategory: {
            id: 'asc',
          },
        },
        {
          level: 'asc',
        },
        {
          id: 'asc',
        },
      ],
    });

    return contents.map((content) =>
      _.merge({}, content, {
        wageFilter: {
          ...(filter?.wageFilter?.includeIsBound === false && {
            includeIsBound: false,
          }),
          ...(filter?.wageFilter?.includeContentRewardItems && {
            includeContentRewardItems:
              filter.wageFilter.includeContentRewardItems,
          }),
        },
      }),
    );
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
            mode: 'insensitive',
          },
        },
        {
          contentCategory: {
            name: {
              contains: filter.keyword,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    return where;
  }
}
