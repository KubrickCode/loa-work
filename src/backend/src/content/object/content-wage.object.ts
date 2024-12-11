import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContentWage {
  @Field(() => Int)
  contentId: number;

  @Field(() => Int)
  krwAmount: number;

  @Field(() => Int)
  goldAmount: number;
}
