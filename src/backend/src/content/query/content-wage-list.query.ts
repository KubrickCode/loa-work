import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { ContentStatus, Prisma } from '@prisma/client';
import { ContentWageService } from '../service/content-wage.service';
import { ContentWage, ContentWageFilter } from '../object/content-wage.object';
import { OrderByArg } from 'src/common/object/order-by-arg.object';
import _ from 'lodash';

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
    private contentWageService: ContentWageService,
  ) {}

  @Query(() => [ContentWage])
  async contentWageList(
    @Args('filter', { nullable: true }) filter?: ContentWageListFilter,
    @Args('orderBy', {
      type: () => [OrderByArg],
      nullable: true,
    })
    orderBy?: OrderByArg[],
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
      include: {
        contentSeeMoreRewards: {
          include: {
            item: true,
          },
        },
      },
    });

    const promises = contents.map(async (content) => {
      return await this.contentWageService.getContentWage(content.id, {
        includeIsBound: filter?.includeIsBound,
        includeItemIds: filter?.includeItemIds,
        includeIsSeeMore: filter?.includeIsSeeMore,
      });
    });

    const result = orderBy
      ? _.orderBy(
          await Promise.all(promises),
          orderBy.map((order) => order.field),
          orderBy.map((order) => order.order),
        )
      : await Promise.all(promises);

    return result;
  }

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

    if (filter?.status) {
      where.status = filter.status;
    }

    return where;
  }
}
