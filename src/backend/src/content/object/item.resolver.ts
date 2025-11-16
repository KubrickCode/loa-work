import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Float } from "@nestjs/graphql";
import { Item } from "./item.object";
import { UserContentService } from "src/user/service/user-content.service";
import { User } from "src/common/object/user.object";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { PrismaService } from "src/prisma";
import { UserItem } from "./user-item.object";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Resolver(() => Item)
export class ItemResolver {
  constructor(
    private userContentService: UserContentService,
    private prisma: PrismaService
  ) {}

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
