import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuctionItemStat {
  @Field(() => Int)
  auctionItemId: number;

  @Field(() => Int)
  bidPrice: number;

  @Field(() => Int)
  bidStartPrice: number;

  @Field(() => Int)
  buyPrice: number;

  @Field()
  createdAt: Date;

  @Field()
  endDate: Date;

  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  isCompetitive: boolean;

  @Field(() => Int)
  startPrice: number;
}
