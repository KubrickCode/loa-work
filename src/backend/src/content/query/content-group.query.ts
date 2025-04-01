import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { ContentGroup } from '../object/content-group.object';

@InputType()
export class ContentGroupFilter {
  @Field(() => [Number], { nullable: true })
  contentIds?: number[];
}

@Resolver()
export class ContentGroupQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => ContentGroup)
  async contentGroup(
    @Args('filter', { nullable: true }) filter?: ContentGroupFilter,
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

    for (const content of contents) {
      if (content.level !== contents[0].level) {
        throw new Error('Content level is not the same');
      }

      if (content.contentCategoryId !== contents[0].contentCategoryId) {
        throw new Error('Content category is not the same');
      }
    }

    return {
      contentIds: contents.map((content) => content.id),
      level: contents[0].level,
      name: contents[0].name,
    };
  }

  buildWhereArgs(filter?: ContentGroupFilter) {
    const where: Prisma.ContentWhereInput = {};

    if (filter?.contentIds) {
      where.id = {
        in: filter.contentIds,
      };
    }

    return where;
  }
}
