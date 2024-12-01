import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Prisma } from '@prisma/client';
import { AuctionItem } from '../object/auction-item.object';

@InputType()
export class AuctionItemListFilter {
  @Field(() => Boolean, { nullable: true })
  isStatScraperEnabled?: boolean;
}

@Resolver()
export class AuctionItemListQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [AuctionItem])
  async auctionItemList(
    @Args('filter', { nullable: true }) filter?: AuctionItemListFilter,
  ) {
    return await this.prisma.auctionItem.findMany({
      where: this.buildWhereArgs(filter),
    });
  }

  private buildWhereArgs(filter?: AuctionItemListFilter) {
    const whereArgs: Prisma.AuctionItemWhereInput = {};

    if (filter?.isStatScraperEnabled !== undefined) {
      whereArgs.isStatScraperEnabled = filter.isStatScraperEnabled;
    }

    return whereArgs;
  }
}
