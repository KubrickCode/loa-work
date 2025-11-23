import { Args, Query, Resolver } from "@nestjs/graphql";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { AuctionItemListFilter } from "./auction-item.dto";
import { AuctionItem } from "./auction-item.object";
import { AuctionItemService } from "./auction-item.service";

@Resolver()
export class AuctionItemResolver {
  constructor(private auctionItemService: AuctionItemService) {}

  @Query(() => [AuctionItem])
  async auctionItemList(@Args("filter", { nullable: true }) filter?: AuctionItemListFilter) {
    return await this.auctionItemService.findAuctionItemList(filter);
  }

  @Query(() => [AuctionItem])
  async auctionItems(
    @Args("orderBy", {
      nullable: true,
      type: () => [OrderByArg],
    })
    orderBy?: OrderByArg[],
    @Args("take", { nullable: true }) take: number | null = 10
  ) {
    return await this.auctionItemService.findAuctionItems(orderBy, take);
  }
}
