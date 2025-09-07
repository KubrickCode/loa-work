import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { GoldExchangeRateQuery } from './query/gold-exchange-rate.query';
import { GoldExchangeRateEditMutation } from './mutation/gold-exchange-rate-edit.mutation';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { DiscordModule } from 'src/discord/discord.module';

@Module({
  imports: [PrismaModule, DiscordModule],
  providers: [
    GoldExchangeRateQuery,
    GoldExchangeRateEditMutation,
    UserGoldExchangeRateService,
  ],
})
export class ExchangeRateModule {}
