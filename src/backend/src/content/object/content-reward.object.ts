import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentReward extends BaseObject {
  @Field(() => Float)
  averageQuantity: number;

  @Field(() => Boolean)
  isSellable: boolean;

  @Field(() => String)
  itemName: string;
}
