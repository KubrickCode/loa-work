import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseObject {
  @Field()
  createdAt: Date;

  @Field(() => Int)
  id: number;

  @Field()
  updatedAt: Date;
}
