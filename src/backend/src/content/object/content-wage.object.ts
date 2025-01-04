import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContentWage {
  @Field(() => Int)
  contentId: number;

  @Field(() => Int)
  krwAmountPerHour: number;

  @Field(() => Int)
  goldAmountPerHour: number;

  @Field(() => Int)
  goldAmountPerClear: number;
}
