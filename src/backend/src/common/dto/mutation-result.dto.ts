import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export abstract class MutationResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
