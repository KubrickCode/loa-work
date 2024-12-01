import { Args, Field, InputType, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from '../object/content.object';
import { Prisma } from '@prisma/client';
import _ from 'lodash';

@InputType()
export class ContentListFilter {
  @Field(() => Int, { nullable: true })
  contentCategoryId?: number;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;
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
        ...(filter?.includeIsBound === false && {
          filter: { includeIsBound: false },
        }),
        ...(filter?.includeIsSeeMore === true && {
          filter: { includeIsSeeMore: true },
        }),
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
