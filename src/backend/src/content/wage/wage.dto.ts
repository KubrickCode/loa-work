import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ContentStatus } from "@prisma/client";

@InputType()
export class ContentWageFilter {
  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => [Number], { nullable: true })
  includeItemIds?: number[];
}

@InputType()
export class ContentWageListFilter extends ContentWageFilter {
  @Field({ nullable: true })
  contentCategoryId?: number;

  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => ContentStatus, { nullable: true })
  status?: ContentStatus;
}

@InputType()
export class CustomContentWageCalculateInput {
  @Field(() => [CustomContentWageCalculateItemsInput])
  items: CustomContentWageCalculateItemsInput[];

  @Field(() => Int)
  minutes: number;

  @Field(() => Int)
  seconds: number;
}

@InputType()
export class CustomContentWageCalculateItemsInput {
  @Field()
  id: number;

  @Field(() => Float)
  quantity: number;
}

@ObjectType()
export class CustomContentWageCalculateResult {
  @Field()
  goldAmountPerClear: number;

  @Field()
  goldAmountPerHour: number;

  @Field()
  krwAmountPerHour: number;

  @Field(() => Boolean)
  ok: boolean;
}
