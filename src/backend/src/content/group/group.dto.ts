import { Field, InputType } from "@nestjs/graphql";
import { ContentStatus } from "@prisma/client";
import { ContentWageFilter } from "../wage/wage.dto";

@InputType()
export class ContentGroupFilter {
  @Field(() => [Number], {
    description: "그룹화할 컨텐츠 ID 목록",
    nullable: true,
  })
  contentIds?: number[];
}

@InputType()
export class ContentGroupWageListFilter extends ContentWageFilter {
  @Field({
    description: "필터링할 컨텐츠 카테고리 ID",
    nullable: true,
  })
  contentCategoryId?: number;

  @Field(() => String, { description: "검색 키워드", nullable: true })
  keyword?: string;

  @Field(() => ContentStatus, { description: "컨텐츠 상태", nullable: true })
  status?: ContentStatus;
}
