import { UseGuards } from "@nestjs/common";
import { Args, Float, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { PrismaService } from "src/prisma";
import { UserContentService } from "src/user/service/user-content.service";
import { ItemsFilter, UserItemPriceEditInput, UserItemPriceEditResult } from "./item.dto";
import { ItemService } from "./item.service";
import { Item, UserItem } from "./item.object";

@Resolver(() => Item)
export class ItemResolver {
  constructor(
    private itemService: ItemService,
    private prisma: PrismaService,
    private userContentService: UserContentService
  ) {}

  @Query(() => Item)
  async item(@Args("id") id: number) {
    return await this.itemService.findItemById(id);
  }

  @Query(() => [Item])
  async items(@Args("filter", { nullable: true }) filter?: ItemsFilter) {
    return await this.itemService.findItems(filter);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserItemPriceEditResult)
  async userItemPriceEdit(@Args("input") input: UserItemPriceEditInput) {
    return await this.itemService.editUserItemPrice(input);
  }

  @ResolveField(() => Float)
  async price(@Parent() item: Item) {
    return await this.userContentService.getItemPrice(item.id);
  }

  @UseGuards(AuthGuard)
  @ResolveField(() => UserItem)
  async userItem(@Parent() item: Item, @CurrentUser() user: User) {
    return await this.prisma.userItem.findUniqueOrThrow({
      where: {
        userId_itemId: {
          itemId: item.id,
          userId: user.id,
        },
      },
    });
  }
}
