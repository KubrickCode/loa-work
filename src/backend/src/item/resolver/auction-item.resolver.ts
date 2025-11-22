import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { PrismaService } from "src/prisma";
import { AuctionItemListFilter } from "../dto/auction-item.dto";
import { AuctionItem } from "../object/auction-item.object";

@Resolver(() => AuctionItem)
export class AuctionItemResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [AuctionItem], { description: "경매장 아이템 목록 조회" })
  async auctionItemList(
    @Args("filter", { nullable: true }) filter?: AuctionItemListFilter
  ): Promise<AuctionItem[]> {
    return await this.prisma.auctionItem.findMany({
      where: this.buildWhereArgs(filter),
    });
  }

  @Query(() => [AuctionItem], { description: "경매장 아이템 정렬 조회" })
  async auctionItems(
    @Args("orderBy", { nullable: true, type: () => [OrderByArg] })
    orderBy?: OrderByArg[],
    @Args("take", { nullable: true, type: () => Int }) take: number | null = 10
  ): Promise<AuctionItem[]> {
    return await this.prisma.auctionItem.findMany({
      orderBy: orderBy?.map((o) => ({ [o.field]: o.order })),
      take: take ?? undefined,
    });
  }

  private buildWhereArgs(filter?: AuctionItemListFilter): Prisma.AuctionItemWhereInput {
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
