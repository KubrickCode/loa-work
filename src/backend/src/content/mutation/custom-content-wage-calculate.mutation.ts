import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContentWageService } from '../service/content-wage.service';

@InputType()
class CustomContentWageCalculateInput {
  @Field()
  duration: number;

  @Field(() => [CustomContentWageCalculateRewardItemInput])
  rewardItems: CustomContentWageCalculateRewardItemInput[];
}

@InputType()
class CustomContentWageCalculateRewardItemInput {
  @Field()
  id: number;

  @Field()
  quantity: number;
}

@ObjectType()
class CustomContentWageCalculateResult {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => Int)
  krwAmountPerHour: number;

  @Field(() => Int)
  goldAmountPerHour: number;

  @Field(() => Int)
  goldAmountPerClear: number;
}

@Resolver()
export class CustomContentWageCalculateMutation {
  constructor(private contentWageService: ContentWageService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CustomContentWageCalculateResult)
  async customContentWageCalculate(
    @Args('input') input: CustomContentWageCalculateInput,
  ) {
    const { duration, rewardItems } = input;

    if (duration <= 0) {
      throw new Error('소요시간은 0초 보다 커야 합니다.');
    }

    const rewardsGold = await this.contentWageService.calculateGold(
      rewardItems.map((item) => ({
        contentRewardItemId: item.id,
        averageQuantity: item.quantity,
      })),
    );

    const { krwAmountPerHour, goldAmountPerHour } =
      await this.contentWageService.calculateWage({
        gold: rewardsGold,
        duration,
      });

    return {
      ok: true,
      krwAmountPerHour,
      goldAmountPerHour,
      goldAmountPerClear: Math.round(rewardsGold),
    };
  }
}
