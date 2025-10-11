import { Args, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { MarketItem } from "../object/market-item.object";

@Resolver()
export class MarketItemsQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [MarketItem])
  async marketItems(
    @Args("orderBy", {
      nullable: true,
      type: () => [OrderByArg],
    })
    orderBy?: OrderByArg[],
    @Args("take", { nullable: true }) take: number | null = 10
  ) {
    return await this.prisma.marketItem.findMany({
      orderBy: orderBy ? orderBy.map((o) => ({ [o.field]: o.order })) : undefined,
      take,
    });
  }
}
