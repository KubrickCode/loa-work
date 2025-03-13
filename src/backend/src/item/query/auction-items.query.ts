import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { OrderByArg } from 'src/common/object/order-by-arg.object';
import { AuctionItem } from '../object/auction-item.object';

@Resolver()
export class AuctionItemsQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [AuctionItem])
  async auctionItems(
    @Args('orderBy', {
      type: () => [OrderByArg],
      nullable: true,
    })
    orderBy?: OrderByArg[],
    @Args('take', { nullable: true }) take: number | null = 10,
  ) {
    return await this.prisma.auctionItem.findMany({
      take,
      orderBy: orderBy
        ? orderBy.map((o) => ({ [o.field]: o.order }))
        : undefined,
    });
  }
}
