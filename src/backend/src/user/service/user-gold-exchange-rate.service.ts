import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CONTEXT } from '@nestjs/graphql';
import { ContextType } from './types';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Injectable()
export class UserGoldExchangeRateService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CONTEXT) private context: ContextType,
  ) {}

  private getUserId() {
    return this.context.req?.user?.id;
  }

  async getGoldExchangeRate() {
    const userId = this.getUserId();

    const goldExchangeRate =
      await this.prisma.goldExchangeRate.findFirstOrThrow();

    if (userId) {
      const userGoldExchangeRate =
        await this.prisma.userGoldExchangeRate.findUnique({
          where: {
            userId,
          },
        });

      return userGoldExchangeRate ?? goldExchangeRate;
    }

    return goldExchangeRate;
  }
}
