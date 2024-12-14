import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class UserContentReward extends BaseObject {
  @Field(() => Float)
  averageQuantity: number;

  @Field(() => Int)
  contentRewardId: number;

  @Field(() => Int)
  userId: number;
}
