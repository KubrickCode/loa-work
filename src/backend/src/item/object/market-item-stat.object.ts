import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MarketItemStat {
  @Field()
  createdAt: Date;

  @Field(() => Float)
  currentMinPrice: number;

  @Field()
  id: number;

  @Field()
  marketItemId: number;

  @Field(() => Float)
  recentPrice: number;

  @Field(() => Float)
  yDayAvgPrice: number;
}
