import { Field, Float, ObjectType } from "@nestjs/graphql";

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
