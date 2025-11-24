import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User as PrismaUser } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { User } from "src/common/object/user.object";
import { UserGoldExchangeRateService } from "src/user/service/user-gold-exchange-rate.service";
import { EditGoldExchangeRateInput, EditGoldExchangeRateResult } from "./gold-exchange-rate.dto";
import { GoldExchangeRate } from "./gold-exchange-rate.object";
import { GoldExchangeRateService } from "./gold-exchange-rate.service";

@Resolver()
export class GoldExchangeRateResolver {
  constructor(
    private goldExchangeRateService: GoldExchangeRateService,
    private userGoldExchangeRateService: UserGoldExchangeRateService
  ) {}

  @Query(() => GoldExchangeRate)
  async goldExchangeRate(@CurrentUser() user?: PrismaUser) {
    return await this.userGoldExchangeRateService.getGoldExchangeRate(user?.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => EditGoldExchangeRateResult)
  async goldExchangeRateEdit(
    @Args("input") input: EditGoldExchangeRateInput,
    @CurrentUser() user: User
  ) {
    return await this.goldExchangeRateService.editGoldExchangeRate(input.krwAmount, user);
  }
}
