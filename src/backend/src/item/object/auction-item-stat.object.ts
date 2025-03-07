import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuctionItemStat {
  @Field()
  auctionItemId: number;

  @Field()
  bidPrice: number;

  @Field()
  bidStartPrice: number;

  @Field()
  buyPrice: number;

  @Field()
  createdAt: Date;

  @Field()
  endDate: Date;

  @Field()
  id: number;

  @Field(() => Boolean)
  isCompetitive: boolean;

  @Field()
  startPrice: number;
}
