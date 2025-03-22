import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class UserContentSeeMoreReward extends BaseObject {
  @Field(() => Float)
  quantity: number;
}
