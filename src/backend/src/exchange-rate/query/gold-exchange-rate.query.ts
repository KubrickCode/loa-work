import { Query, Resolver } from "@nestjs/graphql";
import { GoldExchangeRate } from "../object/gold-exchange-rate.object";
import { UserGoldExchangeRateService } from "src/user/service/user-gold-exchange-rate.service";

@Resolver()
export class GoldExchangeRateQuery {
  constructor(private userGoldExchangeRateService: UserGoldExchangeRateService) {}

  @Query(() => GoldExchangeRate)
  async goldExchangeRate() {
    return await this.userGoldExchangeRateService.getGoldExchangeRate();
  }
}
