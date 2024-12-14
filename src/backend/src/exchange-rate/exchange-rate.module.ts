import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { UserGoldExchangeRateQuery } from './query/user-gold-exchange-rate.query';
import { UserGoldExchangeRateEditMutation } from './mutation/user-gold-exchange-rate-edit.mutation';
import { UserContentService } from 'src/content/service/user-content.service';

@Module({
  imports: [PrismaModule],
  providers: [
    UserGoldExchangeRateQuery,
    UserGoldExchangeRateEditMutation,
    UserContentService,
  ],
})
export class ExchangeRateModule {}
