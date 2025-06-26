import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class UserContentReward extends BaseObject {
  @Field(() => Float)
  averageQuantity: number;

  @Field()
  contentRewardId: number;

  @Field()
  isSellable: boolean;

  @Field()
  userId: number;
}
