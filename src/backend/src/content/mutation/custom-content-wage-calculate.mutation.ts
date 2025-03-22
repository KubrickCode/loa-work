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
  constructor(private contentWageService: ContentWageService) {}

  @Mutation(() => CustomContentWageCalculateResult)
  async customContentWageCalculate(
    @Args('input') input: CustomContentWageCalculateInput,
  ) {
    const { minutes, seconds, rewardItems } = input;

    // 분과 초를 받아서 초 단위로 변환
    const duration = minutes * 60 + seconds;

    if (duration <= 0 || seconds >= 60) {
      throw new Error('유효하지 않은 시간 형식입니다.');
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
