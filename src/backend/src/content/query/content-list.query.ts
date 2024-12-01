import { Args, Field, InputType, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content, ContentWageFilter } from '../object/content.object';
import { Prisma } from '@prisma/client';
import _ from 'lodash';

@InputType()
export class ContentListWageFilter {
  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;
}

@InputType()
export class ContentListFilter {
  @Field(() => Int, { nullable: true })
  contentCategoryId?: number;

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
    });

    return contents.map((content) =>
      _.merge({}, content, {
        wageFilter: {
          ...(filter?.wageFilter?.includeIsBound === false && {
            includeIsBound: false,
          }),
          ...(filter?.wageFilter?.includeIsSeeMore === true && {
            includeIsSeeMore: true,
          }),
        },
      }),
    );
  }

  buildWhereArgs(filter?: ContentListFilter) {
    const where: Prisma.ContentWhereInput = {
      OR: [{ isSeeMore: false }, { isSeeMore: null }],
    };

    if (filter?.contentCategoryId) {
      where.contentCategoryId = filter.contentCategoryId;
    }

    return where;
  }
}
