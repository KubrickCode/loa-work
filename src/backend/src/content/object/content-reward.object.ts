import { Field, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentReward extends BaseObject {
  @Field()
  contentRewardItemId: number;

  @Field(() => Boolean)
  isSellable: boolean;
}
