import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export abstract class BaseObject {
  @Field()
  createdAt: Date;

  @Field()
  id: number;

  @Field()
  updatedAt: Date;
}
