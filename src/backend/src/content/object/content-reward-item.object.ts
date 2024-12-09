import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentRewardItem extends BaseObject {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}
