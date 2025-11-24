import { Field, InputType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { IsIn, IsString } from "class-validator";

@InputType()
export class OrderByArg {
  @Field({ description: "정렬 필드명" })
  @IsString()
  field: string;

  @Field(() => String, { description: "정렬 방향 (asc 또는 desc)" })
  @IsString()
  @IsIn(["asc", "desc"])
  order: Prisma.SortOrder;
}
