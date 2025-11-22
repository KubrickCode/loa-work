import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class OrderByArg {
  @Field(() => String, { nullable: true })
  orderBy?: string;

  @Field(() => String, { nullable: true })
  orderDirection?: "asc" | "desc";
}
