import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentSeeMoreReward extends BaseObject {
  @Field()
  contentId: number;

  @Field()
  contentRewardItemId: number;

  @Field(() => Float)
  quantity: number;
}
