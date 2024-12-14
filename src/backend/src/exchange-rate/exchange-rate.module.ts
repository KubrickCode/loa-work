import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { UserGoldExchangeRateQuery } from './query/user-gold-exchange-rate.query';
import { UserGoldExchangeRateEditMutation } from './mutation/user-gold-exchange-rate-edit.mutation';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';

@Module({
  imports: [PrismaModule],
  providers: [
    UserGoldExchangeRateQuery,
    UserGoldExchangeRateEditMutation,
    UserGoldExchangeRateService,
  ],
})
export class ExchangeRateModule {}
