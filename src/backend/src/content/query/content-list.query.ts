import { Args, Field, InputType, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from '../object/content.object';
import { Prisma } from '@prisma/client';

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

    return contents.map((content) => ({
      ...content,
      ...(filter?.includeIsBound === false && {
        filter: { includeIsBound: false },
      }),
    }));
  }

  buildWhereArgs(filter?: ContentListFilter) {
    const where: Prisma.ContentWhereInput = {};

    if (filter?.contentCategoryId) {
      where.contentCategoryId = filter.contentCategoryId;
    }

    if (filter?.includeIsSeeMore === false) {
      where.OR = [{ isSeeMore: false }, { isSeeMore: null }];
    }

    return where;
  }
}
