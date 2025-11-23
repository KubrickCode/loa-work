import { Field, Float, ObjectType } from "@nestjs/graphql";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class AuctionItem extends BaseObject {
  @Field(() => Float)
  avgBuyPrice: number;

  @Field()
  imageUrl: string;

  @Field()
  isStatScraperEnabled: boolean;

  @Field()
  name: string;
}
