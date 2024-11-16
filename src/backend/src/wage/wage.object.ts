import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MinimumWage {
  @Field()
  createdAt: Date;

  @Field(() => Int)
  id: number;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  year: number;
}
