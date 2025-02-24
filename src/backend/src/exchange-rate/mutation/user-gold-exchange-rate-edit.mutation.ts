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
import { Prisma, UserRole } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { User } from 'src/common/object/user.object';
import { PrismaService } from 'src/prisma';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';

@InputType()
class UserGoldExchangeRateEditInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  krwAmount: number;
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
    private userGoldExchangeRateService: UserGoldExchangeRateService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserGoldExchangeRateEditResult)
  async userGoldExchangeRateEdit(
    @Args('input') input: UserGoldExchangeRateEditInput,
    @CurrentUser() user: User,
  ) {
    const { id, krwAmount } = input;

    await this.userGoldExchangeRateService.validateUserGoldExchangeRate(id);

    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await this.editDefaultGoldExchangeRate(krwAmount, tx);
      }

      await tx.userGoldExchangeRate.update({
        where: { id },
        data: { isEdited: true, krwAmount },
      });

      return { ok: true };
    });
  }

  async editDefaultGoldExchangeRate(
    krwAmount: number,
    tx: Prisma.TransactionClient,
  ) {
    await tx.userGoldExchangeRate.updateMany({
      where: {
        isEdited: false,
      },
      data: {
        krwAmount,
      },
    });

    const { id } = await tx.goldExchangeRate.findFirstOrThrow();

    await tx.goldExchangeRate.update({
      where: {
        id,
      },
      data: {
        krwAmount,
      },
    });
  }
}
