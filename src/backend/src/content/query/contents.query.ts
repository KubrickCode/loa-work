import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Content } from '../object/content.object';
import { Prisma } from '@prisma/client';
import _ from 'lodash';

@InputType()
export class ContentsFilter {
  @Field(() => [Number], { nullable: true })
  ids?: number[];
}

@Resolver()
export class ContentsQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Content])
  async contents(@Args('filter', { nullable: true }) filter?: ContentsFilter) {
    return await this.prisma.content.findMany({
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
  }

  buildWhereArgs(filter?: ContentsFilter) {
    const where: Prisma.ContentWhereInput = {};

    if (filter?.ids) {
      where.id = {
        in: filter.ids,
      };
    }

    return where;
  }
}
