import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { DEFAULT_PAGE_SIZE } from "src/common/pagination/constants";

@ArgsType()
export class ConnectionArgs {
  @Field(() => String, { description: "커서 이후", nullable: true })
  @IsString()
  @IsOptional()
  after?: string;

  @Field(() => Int, { description: "처음 N개 항목", nullable: true })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  first?: number = DEFAULT_PAGE_SIZE;
}
