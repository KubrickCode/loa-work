import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CONTEXT } from '@nestjs/graphql';
import { ContextType } from './types';

@Injectable()
export class UserGoldExchangeRateService {
  private readonly userId?: number;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(CONTEXT) context: ContextType,
  ) {
    this.userId = context.req?.user?.id;
  }

  async getGoldExchangeRate() {
    const goldExchangeRate =
      await this.prisma.goldExchangeRate.findFirstOrThrow();

    return this.userId
      ? await this.prisma.userGoldExchangeRate.findUniqueOrThrow({
          where: {
            userId: this.userId,
          },
        })
      : goldExchangeRate;
  }

  async validateUserGoldExchangeRate(rateId: number) {
    const userGoldExchangeRate =
      await this.prisma.userGoldExchangeRate.findUnique({
        where: { id: rateId, userId: this.userId },
      });

    if (!userGoldExchangeRate) {
      throw new Error('환율에 대한 수정 권한이 없습니다');
    }

    return true;
  }
}
