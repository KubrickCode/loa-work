import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  Float,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma';
import { UserContentService } from '../../user/service/user-content.service';

@InputType()
class UserContentRewardItemEditInput {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  price: number;
}

@ObjectType()
class UserContentRewardItemEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class UserContentRewardItemEditMutation {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserContentRewardItemEditResult)
  async userContentRewardItemEdit(
    @Args('input') input: UserContentRewardItemEditInput,
  ) {
    const { id, price } = input;

    await this.userContentService.validateUserContentRewardItem(id);

    await this.prisma.userContentRewardItem.update({
      where: { id },
      data: { price },
    });

    return { ok: true };
  }
}
