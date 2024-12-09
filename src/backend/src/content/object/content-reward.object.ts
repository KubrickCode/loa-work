import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentReward extends BaseObject {
  @Field(() => Float)
  averageQuantity: number;

  @Field(() => Int)
  contentRewardItemId: number;

  @Field(() => Boolean)
  isSellable: boolean;
}
