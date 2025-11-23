import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { UserGoldExchangeRateService } from "src/user/service/user-gold-exchange-rate.service";
import { GoldExchangeRateEditInput, GoldExchangeRateEditResult } from "./gold-exchange-rate.dto";
import { GoldExchangeRate } from "./gold-exchange-rate.object";
import { GoldExchangeRateService } from "./gold-exchange-rate.service";

@Resolver()
export class GoldExchangeRateResolver {
  constructor(
    private goldExchangeRateService: GoldExchangeRateService,
    private userGoldExchangeRateService: UserGoldExchangeRateService
  ) {}

  @Query(() => GoldExchangeRate)
  async goldExchangeRate() {
    return await this.userGoldExchangeRateService.getGoldExchangeRate();
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GoldExchangeRateEditResult)
  async goldExchangeRateEdit(
    @Args("input") input: GoldExchangeRateEditInput,
    @CurrentUser() user: User
  ) {
    return await this.goldExchangeRateService.editGoldExchangeRate(input.krwAmount, user);
  }
}
