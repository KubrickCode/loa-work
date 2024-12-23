import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MarketItemStat {
  @Field()
  createdAt: Date;

  @Field(() => Int)
  currentMinPrice: number;

  @Field(() => Int)
  id: number;

  @Field(() => Int)
  marketItemId: number;

  @Field(() => Int)
  recentPrice: number;

  @Field(() => Float)
  yDayAvgPrice: number;
}
