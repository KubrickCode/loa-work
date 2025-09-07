import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { Item } from '../object/item.object';
import { ItemKind, Prisma } from '@prisma/client';
import { ItemSortOrder } from '../constants';

@InputType()
class ItemsFilter {
  @Field({ nullable: true })
  excludeItemName?: string;

  @Field(() => ItemKind, { nullable: true })
  kind?: ItemKind;
}

@Resolver()
export class ItemsQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Item])
  async items(@Args('filter', { nullable: true }) filter?: ItemsFilter) {
    const items = await this.prisma.item.findMany({
      where: this.buildWhereArgs(filter),
    });

    return items.sort((a, b) => {
      const aOrder = ItemSortOrder[a.name] || 999;
      const bOrder = ItemSortOrder[b.name] || 999;
      return aOrder - bOrder;
    });
  }

  private buildWhereArgs(filter: ItemsFilter) {
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
}
