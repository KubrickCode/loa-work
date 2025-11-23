import { Field, InputType } from "@nestjs/graphql";
import { ContentStatus } from "@prisma/client";
import { ContentWageFilter } from "../wage/wage.dto";

@InputType()
export class ContentGroupFilter {
  @Field(() => [Number], { nullable: true })
  contentIds?: number[];
}

@InputType()
export class ContentGroupWageListFilter extends ContentWageFilter {
  @Field({ nullable: true })
  contentCategoryId?: number;

  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => ContentStatus, { nullable: true })
  status?: ContentStatus;
}
