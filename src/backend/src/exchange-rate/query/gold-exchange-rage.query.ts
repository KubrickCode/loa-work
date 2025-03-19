import { Query, Resolver } from '@nestjs/graphql';
import { UserGoldExchangeRate } from '../object/user-gold-exchange-rate.object';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';

@Resolver()
export class GoldExchangeRateQuery {
  constructor(
    private userGoldExchangeRateService: UserGoldExchangeRateService,
  ) {}

  @Query(() => UserGoldExchangeRate)
  async goldExchangeRate() {
    return await this.userGoldExchangeRateService.getGoldExchangeRate();
  }
}
