import {
  Args,
  Field,
  Float,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from "@nestjs/graphql";
import { ContentWageService } from "../service/content-wage.service";
import { ContentDurationService } from "../service/content-duration.service";

@InputType()
class CustomContentWageCalculateInput {
  @Field(() => [CustomContentWageCalculateItemsInput])
  items: CustomContentWageCalculateItemsInput[];

  @Field(() => Int)
  minutes: number;

  @Field(() => Int)
  seconds: number;
}

@InputType()
class CustomContentWageCalculateItemsInput {
  @Field()
  id: number;

  @Field(() => Float)
  quantity: number;
}

@ObjectType()
class CustomContentWageCalculateResult {
  @Field()
  goldAmountPerClear: number;

  @Field()
  goldAmountPerHour: number;

  @Field()
  krwAmountPerHour: number;

  @Field(() => Boolean)
  ok: boolean;
}

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
