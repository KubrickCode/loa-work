import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from '../object/content.object';
import { ContentType, Prisma } from '@prisma/client';

@InputType()
export class ContentListFilter {
  @Field(() => ContentType, { nullable: true })
  contentType?: ContentType;
}

@Resolver()
export class ContentListQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Content])
  async contentList(
    @Args('filter', { nullable: true }) filter?: ContentListFilter,
  ) {
    return await this.prisma.content.findMany({
      where: this.buildWhereArgs(filter),
    });
  }

  buildWhereArgs(filter?: ContentListFilter) {
    const where: Prisma.ContentWhereInput = {};

    if (filter?.contentType) {
      where.type = filter.contentType;
    }

    return where;
  }
}
