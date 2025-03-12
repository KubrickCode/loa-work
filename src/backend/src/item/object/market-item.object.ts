import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class MarketItem extends BaseObject {
  @Field()
  bundleCount: number;

  @Field()
  currentMinPrice: number;

  @Field()
  imageUrl: string;

  @Field()
  isStatScraperEnabled: boolean;

  @Field()
  name: string;

  @Field()
  recentPrice: number;

  @Field()
  refId: number;

  @Field(() => Float)
  yDayAvgPrice: number;
}
