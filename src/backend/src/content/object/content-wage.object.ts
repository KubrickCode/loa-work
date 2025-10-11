import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ContentWage {
  @Field()
  contentId: number;

  @Field(() => Float)
  goldAmountPerClear: number;

  @Field(() => Float)
  goldAmountPerHour: number;

  @Field(() => Float)
  krwAmountPerHour: number;
}

@InputType()
export class ContentWageFilter {
  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => [Number], { nullable: true })
  includeItemIds?: number[];
}
