import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CustomContentWageCalculateInput, CustomContentWageCalculateResult } from "../dto";
import { ContentDurationService } from "../service/content-duration.service";
import { ContentWageService } from "../service/content-wage.service";

@Resolver()
export class CustomContentWageCalculateMutation {
  constructor(
    private contentWageService: ContentWageService,
    private contentDurationService: ContentDurationService
  ) {}

  @Mutation(() => CustomContentWageCalculateResult)
  async customContentWageCalculate(@Args("input") input: CustomContentWageCalculateInput) {
    const { items, minutes, seconds } = input;

    const totalSeconds = this.contentDurationService.getValidatedTotalSeconds({
      minutes,
      seconds,
    });

    const rewardsGold = await this.contentWageService.calculateGold(
      items.map((item) => ({
        averageQuantity: item.quantity,
        itemId: item.id,
      }))
    );

    const { goldAmountPerHour, krwAmountPerHour } = await this.contentWageService.calculateWage({
      duration: totalSeconds,
      gold: rewardsGold,
    });

    return {
      goldAmountPerClear: Math.round(rewardsGold),
      goldAmountPerHour,
      krwAmountPerHour,
      ok: true,
    };
  }
}
