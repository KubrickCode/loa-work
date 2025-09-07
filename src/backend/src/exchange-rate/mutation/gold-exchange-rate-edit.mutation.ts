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
import { DiscordService } from 'src/discord/discord.service';
import { PrismaService } from 'src/prisma';

@InputType()
class GoldExchangeRateEditInput {
  @Field(() => Int)
  krwAmount: number;
}

@ObjectType()
class GoldExchangeRateEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@Resolver()
export class GoldExchangeRateEditMutation {
  constructor(
    private prisma: PrismaService,
    private discordService: DiscordService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => GoldExchangeRateEditResult)
  async goldExchangeRateEdit(
    @Args('input') input: GoldExchangeRateEditInput,
    @CurrentUser() user: User,
  ) {
    const { krwAmount } = input;

    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await this.editDefaultGoldExchangeRate(krwAmount, tx);
      }

      const { goldAmount } = await tx.goldExchangeRate.findFirstOrThrow();

      await tx.userGoldExchangeRate.upsert({
        where: { userId: user.id },
        update: { krwAmount },
        create: {
          userId: user.id,
          krwAmount,
          goldAmount,
        },
      });

      return { ok: true };
    });
  }

  async editDefaultGoldExchangeRate(
    krwAmount: number,
    tx: Prisma.TransactionClient,
  ) {
    const goldExchangeRate = await tx.goldExchangeRate.findFirstOrThrow();

    const updatedGoldExchangeRate = await tx.goldExchangeRate.update({
      where: {
        id: goldExchangeRate.id,
      },
      data: {
        krwAmount,
      },
    });

    if (process.env.NODE_ENV !== 'production') return;

    const before = `${goldExchangeRate.goldAmount}:${goldExchangeRate.krwAmount}`;
    const after = `${updatedGoldExchangeRate.goldAmount}:${updatedGoldExchangeRate.krwAmount}`;
    const message = `서버 골드 환율 변경\n**${before}** -> **${after}**`;

    await this.discordService.sendMessage(message);
  }
}
