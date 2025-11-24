import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma";

@Injectable()
export class UserGoldExchangeRateService {
  constructor(private readonly prisma: PrismaService) {}

  async getGoldExchangeRate(userId?: number) {
    const goldExchangeRate = await this.prisma.goldExchangeRate.findFirstOrThrow();

    if (userId) {
      const userGoldExchangeRate = await this.prisma.userGoldExchangeRate.findUnique({
        where: {
          userId,
        },
      });

      return userGoldExchangeRate ?? goldExchangeRate;
    }

    return goldExchangeRate;
  }
}
