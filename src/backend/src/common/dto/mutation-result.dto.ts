import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FieldError {
  @Field(() => String, { description: "Field with error" })
  field: string;

  @Field(() => String, { description: "Error message" })
  message: string;
}

@ObjectType()
export class MutationResult {
  @Field(() => [FieldError], { description: "Field-level errors", nullable: true })
  errors?: FieldError[];

  @Field(() => String, { description: "Message", nullable: true })
  message?: string;

  @Field(() => Boolean, { description: "Success status" })
  success: boolean;
}
