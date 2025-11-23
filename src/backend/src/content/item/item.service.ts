import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma";
import { UserContentService } from "src/user/service/user-content.service";
import { ItemSortOrder } from "../shared/constants";
import { ItemsFilter, UserItemPriceEditInput, UserItemPriceEditResult } from "./item.dto";
import { Item } from "./item.object";

@Injectable()
export class ItemService {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService
  ) {}

  buildItemsWhere(filter?: ItemsFilter): Prisma.ItemWhereInput {
    const where: Prisma.ItemWhereInput = {};

    if (filter?.kind) {
      where.kind = filter.kind;
    }

    if (filter?.excludeItemName) {
      where.name = {
        not: filter.excludeItemName,
      };
    }

    return where;
  }

  async editUserItemPrice(input: UserItemPriceEditInput): Promise<UserItemPriceEditResult> {
    const { id, price } = input;

    await this.userContentService.validateUserItem(id);

    await this.prisma.userItem.update({
      data: { price },
      where: { id },
    });

    return { ok: true };
  }

  async findItemById(id: number): Promise<Item> {
    return await this.prisma.item.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findItems(filter?: ItemsFilter): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      where: this.buildItemsWhere(filter),
    });

    return this.sortItemsByPredefinedOrder(items);
  }

  private sortItemsByPredefinedOrder(items: Item[]): Item[] {
    return items.sort((a, b) => {
      const aOrder = ItemSortOrder[a.name] || 999;
      const bOrder = ItemSortOrder[b.name] || 999;
      return aOrder - bOrder;
    });
  }
}
