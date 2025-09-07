import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  Float,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma';
import { UserContentService } from '../../user/service/user-content.service';

@InputType()
class UserItemEditInput {
  @Field()
  id: number;

  @Field(() => Float)
  price: number;
}

@ObjectType()
class UserItemEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class UserItemEditMutation {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserItemEditResult)
  async userItemEdit(@Args('input') input: UserItemEditInput) {
    const { id, price } = input;

    await this.userContentService.validateUserItem(id);

    await this.prisma.userItem.update({
      where: { id },
      data: { price },
    });

    return { ok: true };
  }
}
