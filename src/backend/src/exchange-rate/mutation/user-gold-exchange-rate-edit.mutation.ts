import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserContentService } from 'src/content/service/user-content.service';
import { PrismaService } from 'src/prisma';

@InputType()
class UserGoldExchangeRateEditInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  goldAmount: number;
}

@ObjectType()
class UserGoldExchangeRateEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class UserGoldExchangeRateEditMutation {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserGoldExchangeRateEditResult)
  async userGoldExchangeRateEdit(
    @Args('input') input: UserGoldExchangeRateEditInput,
  ) {
    const { id, goldAmount } = input;

    await this.userContentService.validateUserGoldExchangeRate(id);

    await this.prisma.userGoldExchangeRate.update({
      where: { id },
      data: { goldAmount },
    });

    return { ok: true };
  }
}
