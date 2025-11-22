import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { PrismaService } from "src/prisma";
import { MarketItemListFilter } from "../dto/market-item.dto";
import { MarketItem } from "../object/market-item.object";

@Resolver(() => MarketItem)
export class MarketItemResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [MarketItem], { description: "거래소 아이템 목록 조회" })
  async marketItemList(
    @Args("filter", { nullable: true }) filter?: MarketItemListFilter
  ): Promise<MarketItem[]> {
    return await this.prisma.marketItem.findMany({
      where: this.buildWhereArgs(filter),
    });
  }

  @Query(() => [MarketItem], { description: "거래소 아이템 정렬 조회" })
  async marketItems(
    @Args("orderBy", { nullable: true, type: () => [OrderByArg] })
    orderBy?: OrderByArg[],
    @Args("take", { nullable: true, type: () => Int }) take: number | null = 10
  ): Promise<MarketItem[]> {
    return await this.prisma.marketItem.findMany({
      orderBy: orderBy?.map((o) => ({ [o.field]: o.order })),
      take: take ?? undefined,
    });
  }

  private buildWhereArgs(filter?: MarketItemListFilter): Prisma.MarketItemWhereInput {
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
