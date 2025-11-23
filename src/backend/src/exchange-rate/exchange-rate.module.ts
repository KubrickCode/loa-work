import { Module } from "@nestjs/common";
import { DiscordModule } from "src/discord/discord.module";
import { PrismaModule } from "src/prisma";
import { UserGoldExchangeRateService } from "src/user/service/user-gold-exchange-rate.service";
import { GoldExchangeRateResolver } from "./gold-exchange-rate.resolver";
import { GoldExchangeRateService } from "./gold-exchange-rate.service";

@Module({
  imports: [PrismaModule, DiscordModule],
  providers: [GoldExchangeRateResolver, GoldExchangeRateService, UserGoldExchangeRateService],
})
export class ExchangeRateModule {}
