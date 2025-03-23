import {
  Args,
  Field,
  Float,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { ContentWageService } from '../service/content-wage.service';
import { ContentDurationService } from '../service/content-duration.service';

@InputType()
class CustomContentWageCalculateInput {
  @Field(() => Int)
  minutes: number;

  @Field(() => Int)
  seconds: number;

  @Field(() => [CustomContentWageCalculateRewardItemInput])
  rewardItems: CustomContentWageCalculateRewardItemInput[];
}

@InputType()
class CustomContentWageCalculateRewardItemInput {
  @Field()
  id: number;

  @Field(() => Float)
  quantity: number;
}

@ObjectType()
class CustomContentWageCalculateResult {
  @Field(() => Boolean)
  ok: boolean;

  @Field()
  krwAmountPerHour: number;

  @Field()
  goldAmountPerHour: number;

  @Field()
  goldAmountPerClear: number;
}

@Resolver()
export class CustomContentWageCalculateMutation {
  constructor(
    private contentWageService: ContentWageService,
    private contentDurationService: ContentDurationService,
  ) {}

  @Mutation(() => CustomContentWageCalculateResult)
  async customContentWageCalculate(
    @Args('input') input: CustomContentWageCalculateInput,
  ) {
    const { minutes, seconds, rewardItems } = input;

    const totalSeconds = this.contentDurationService.getValidatedTotalSeconds({
      minutes,
      seconds,
    });

    const rewardsGold = await this.contentWageService.calculateGold(
      rewardItems.map((item) => ({
        contentRewardItemId: item.id,
        averageQuantity: item.quantity,
      })),
    );

    const { krwAmountPerHour, goldAmountPerHour } =
      await this.contentWageService.calculateWage({
        gold: rewardsGold,
        duration: totalSeconds,
      });

    return {
      ok: true,
      krwAmountPerHour,
      goldAmountPerHour,
      goldAmountPerClear: Math.round(rewardsGold),
    };
  }
}
