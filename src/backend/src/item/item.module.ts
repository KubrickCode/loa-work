import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma";
import { AuctionItemResolver } from "./auction-item/auction-item.resolver";
import { AuctionItemService } from "./auction-item/auction-item.service";
import { MarketItemResolver } from "./market-item/market-item.resolver";
import { MarketItemService } from "./market-item/market-item.service";

@Module({
  imports: [PrismaModule],
  providers: [AuctionItemResolver, AuctionItemService, MarketItemResolver, MarketItemService],
})
export class ItemModule {}
