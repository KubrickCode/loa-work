import {
  Args,
  Field,
  Float,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { ContentWageService } from '../service/content-wage.service';
import { UserInputError } from 'apollo-server-express';

@InputType()
class CustomContentWageCalculateInput {
  @Field()
  minutes: number;

  @Field()
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

    if (duration <= 0) {
      throw new UserInputError('소요시간은 0초 보다 커야 합니다.', {
        field: 'duration',
      });
    }

    if (seconds < 0 || seconds >= 60) {
      throw new UserInputError('초는 0~59 사이의 값이어야 합니다.', {
        field: 'seconds',
      });
    }

    if (minutes < 0) {
      throw new UserInputError('분은 0 이상이어야 합니다.', {
        field: 'minutes',
      });
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
