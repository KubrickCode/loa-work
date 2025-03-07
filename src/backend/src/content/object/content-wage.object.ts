import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContentWage {
  @Field()
  contentId: number;

  @Field()
  krwAmountPerHour: number;

  @Field()
  goldAmountPerHour: number;

  @Field()
  goldAmountPerClear: number;
}
