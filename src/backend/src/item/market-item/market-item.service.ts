import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { PrismaService } from "src/prisma";
import { MarketItemListFilter } from "./market-item.dto";

@Injectable()
export class MarketItemService {
  constructor(private prisma: PrismaService) {}

  async findMarketItemList(filter?: MarketItemListFilter) {
    return await this.prisma.marketItem.findMany({
      where: this.buildWhereArgs(filter),
    });
  }

  async findMarketItems(orderBy?: OrderByArg[], take: number | null = 10) {
    return await this.prisma.marketItem.findMany({
      orderBy: orderBy ? orderBy.map((o) => ({ [o.field]: o.order })) : undefined,
      take,
    });
  }

  private buildWhereArgs(filter?: MarketItemListFilter) {
    const whereArgs: Prisma.MarketItemWhereInput = {};

    if (filter?.isStatScraperEnabled !== undefined) {
      whereArgs.isStatScraperEnabled = filter.isStatScraperEnabled;
    }

    if (filter?.categoryName) {
      whereArgs.marketItemCategory = {
        name: filter.categoryName,
      };
    }

    if (filter?.grade) {
      whereArgs.grade = filter.grade;
    }

    if (filter?.keyword) {
      whereArgs.OR = [
        {
          name: {
            contains: filter.keyword,
            mode: "insensitive",
          },
        },
      ];
    }

    return whereArgs;
  }
}
