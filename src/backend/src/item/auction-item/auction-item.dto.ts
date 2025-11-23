import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AuctionItemListFilter {
  @Field(() => Boolean, { nullable: true })
  isStatScraperEnabled?: boolean;

  @Field(() => String, { nullable: true })
  nameKeyword?: string;
}
