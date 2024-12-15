import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class UserContentRewardItem extends BaseObject {
  @Field(() => Int)
  contentRewardItemId: number;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  userId: number;
}
