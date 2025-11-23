import { Injectable } from "@nestjs/common";
import { Prisma, UserRole } from "@prisma/client";
import { User } from "src/common/object/user.object";
import { DiscordService } from "src/discord/discord.service";
import { PrismaService } from "src/prisma";

@Injectable()
export class GoldExchangeRateService {
  constructor(
    private prisma: PrismaService,
    private discordService: DiscordService
  ) {}

  async editGoldExchangeRate(krwAmount: number, user: User) {
    return await this.prisma.$transaction(async (tx) => {
      if (user.role === UserRole.OWNER) {
        await this.editDefaultGoldExchangeRate(krwAmount, tx);
      }

      const { goldAmount } = await tx.goldExchangeRate.findFirstOrThrow();

      await tx.userGoldExchangeRate.upsert({
        create: {
          goldAmount,
          krwAmount,
          userId: user.id,
        },
        update: { krwAmount },
        where: { userId: user.id },
      });

      return { ok: true };
    });
  }

  private async editDefaultGoldExchangeRate(krwAmount: number, tx: Prisma.TransactionClient) {
    const goldExchangeRate = await tx.goldExchangeRate.findFirstOrThrow();

    const updatedGoldExchangeRate = await tx.goldExchangeRate.update({
      data: {
        krwAmount,
      },
      where: {
        id: goldExchangeRate.id,
      },
    });

    if (process.env.NODE_ENV !== "production") return;

    const before = `${goldExchangeRate.goldAmount}:${goldExchangeRate.krwAmount}`;
    const after = `${updatedGoldExchangeRate.goldAmount}:${updatedGoldExchangeRate.krwAmount}`;
    const message = `서버 골드 환율 변경\n**${before}** -> **${after}**`;

    await this.discordService.sendMessage(message);
  }
}
