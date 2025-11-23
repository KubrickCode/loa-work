import { Args, Query, Resolver } from "@nestjs/graphql";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { MarketItemListFilter } from "./market-item.dto";
import { MarketItem } from "./market-item.object";
import { MarketItemService } from "./market-item.service";

@Resolver()
export class MarketItemResolver {
  constructor(private marketItemService: MarketItemService) {}

  @Query(() => [MarketItem])
  async marketItemList(@Args("filter", { nullable: true }) filter?: MarketItemListFilter) {
    return await this.marketItemService.findMarketItemList(filter);
  }

  @Query(() => [MarketItem])
  async marketItems(
    @Args("orderBy", {
      nullable: true,
      type: () => [OrderByArg],
    })
    orderBy?: OrderByArg[],
    @Args("take", { nullable: true }) take: number | null = 10
  ) {
    return await this.marketItemService.findMarketItems(orderBy, take);
  }
}
