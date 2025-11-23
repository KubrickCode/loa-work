import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class MarketItemListFilter {
  @Field({ nullable: true })
  categoryName?: string;

  @Field({ nullable: true })
  grade?: string;

  @Field(() => Boolean, { nullable: true })
  isStatScraperEnabled?: boolean;

  @Field({ nullable: true })
  keyword?: string;
}
