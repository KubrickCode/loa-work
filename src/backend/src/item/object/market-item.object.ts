import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class MarketItem extends BaseObject {
  @Field(() => Int)
  bundleCount: number;

  @Field()
  imageSrc: string;

  @Field()
  isStatScraperEnabled: boolean;

  @Field()
  name: string;

  @Field(() => Int)
  refId: number;
}
