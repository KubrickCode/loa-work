import { UseGuards } from "@nestjs/common";
import { Args, Field, Float, InputType, Mutation, ObjectType, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { PrismaService } from "src/prisma";
import { UserContentService } from "../../user/service/user-content.service";

@InputType()
class UserItemPriceEditInput {
  @Field()
  id: number;

  @Field(() => Float)
  price: number;
}

@ObjectType()
class UserItemPriceEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

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
