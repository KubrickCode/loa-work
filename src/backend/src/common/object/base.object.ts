import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BaseObject {
  @Field()
  createdAt: Date;

  @Field()
  id: number;

  @Field()
  updatedAt: Date;
}
