import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { UserGoldExchangeRateQuery } from './query/user-gold-exchange-rate.query';
import { UserGoldExchangeRateEditMutation } from './mutation/user-gold-exchange-rate-edit.mutation';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { GoldExchangeRateQuery } from './query/gold-exchange-rage.query';
import { DiscordModule } from 'src/discord/discord.module';

@Module({
  imports: [PrismaModule, DiscordModule],
  providers: [
    UserGoldExchangeRateQuery,
    UserGoldExchangeRateEditMutation,
    UserGoldExchangeRateService,
    GoldExchangeRateQuery,
  ],
})
export class ExchangeRateModule {}
