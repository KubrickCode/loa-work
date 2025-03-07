import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MarketItemStat {
  @Field()
  createdAt: Date;

  @Field()
  currentMinPrice: number;

  @Field()
  id: number;

  @Field()
  marketItemId: number;

  @Field()
  recentPrice: number;

  @Field(() => Float)
  yDayAvgPrice: number;
}
