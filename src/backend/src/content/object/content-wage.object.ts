import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ContentWage {
  @Field()
  contentId: number;

  @Field(() => Float)
  krwAmountPerHour: number;

  @Field(() => Float)
  goldAmountPerHour: number;

  @Field(() => Float)
  goldAmountPerClear: number;
}

@InputType()
export class ContentWageFilter {
  @Field(() => [Number], { nullable: true })
  includeItemIds?: number[];

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;
}
