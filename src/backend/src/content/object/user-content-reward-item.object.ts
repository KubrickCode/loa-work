import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class UserContentRewardItem extends BaseObject {
  @Field()
  contentRewardItemId: number;

  @Field(() => Float)
  price: number;

  @Field()
  userId: number;
}
