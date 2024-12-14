import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentSeeMoreReward extends BaseObject {
  @Field(() => Int)
  contentId: number;

  @Field(() => Int)
  contentRewardItemId: number;

  @Field(() => Int)
  quantity: number;
}
