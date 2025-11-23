import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuctionItemStat {
  @Field()
  auctionItemId: number;

  @Field(() => Float)
  bidPrice: number;

  @Field(() => Float)
  bidStartPrice: number;

  @Field(() => Float)
  buyPrice: number;

  @Field()
  createdAt: Date;

  @Field()
  endDate: Date;

  @Field()
  id: number;

  @Field(() => Boolean)
  isCompetitive: boolean;

  @Field(() => Float)
  startPrice: number;
}
