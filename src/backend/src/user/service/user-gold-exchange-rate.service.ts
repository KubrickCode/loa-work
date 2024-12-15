import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CONTEXT } from '@nestjs/graphql';
import { ContextType } from './types';

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

    return userId
      ? await this.prisma.userGoldExchangeRate.findUniqueOrThrow({
          where: {
            userId,
          },
        })
      : goldExchangeRate;
  }

  async validateUserGoldExchangeRate(rateId: number) {
    const userId = this.getUserId();

    const userGoldExchangeRate =
      await this.prisma.userGoldExchangeRate.findUnique({
        where: { id: rateId, userId },
      });

    if (!userGoldExchangeRate) {
      throw new Error('환율에 대한 수정 권한이 없습니다');
    }

    return true;
  }
}
