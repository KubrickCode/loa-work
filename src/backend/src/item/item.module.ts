import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma";
import { AuctionItemResolver } from "./resolver/auction-item.resolver";
import { MarketItemResolver } from "./resolver/market-item.resolver";

@Module({
  imports: [PrismaModule],
  providers: [MarketItemResolver, AuctionItemResolver],
})
export class ItemModule {}
