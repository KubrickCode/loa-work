import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { PrismaService } from "src/prisma";
import { AuctionItemListFilter } from "./auction-item.dto";

@Injectable()
export class AuctionItemService {
  constructor(private prisma: PrismaService) {}

  async findAuctionItemList(filter?: AuctionItemListFilter) {
    return await this.prisma.auctionItem.findMany({
      where: this.buildWhereArgs(filter),
    });
  }

  async findAuctionItems(orderBy?: OrderByArg[], take: number | null = 10) {
    return await this.prisma.auctionItem.findMany({
      orderBy: orderBy ? orderBy.map((o) => ({ [o.field]: o.order })) : undefined,
      take,
    });
  }

  private buildWhereArgs(filter?: AuctionItemListFilter) {
    const whereArgs: Prisma.AuctionItemWhereInput = {};

    if (filter?.isStatScraperEnabled !== undefined) {
      whereArgs.isStatScraperEnabled = filter.isStatScraperEnabled;
    }

    if (filter?.nameKeyword) {
      whereArgs.name = {
        contains: filter.nameKeyword,
      };
    }

    return whereArgs;
  }
}
