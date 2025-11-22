import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { PrismaService } from "src/prisma";
import { UserContentService } from "../../user/service/user-content.service";
import { UserItemPriceEditInput, UserItemPriceEditResult } from "../dto";

@Resolver()
export class UserItemPriceEditMutation {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserItemPriceEditResult)
  async userItemPriceEdit(@Args("input") input: UserItemPriceEditInput) {
    const { id, price } = input;

    await this.userContentService.validateUserItem(id);

    await this.prisma.userItem.update({
      data: { price },
      where: { id },
    });

    return { ok: true };
  }
}
