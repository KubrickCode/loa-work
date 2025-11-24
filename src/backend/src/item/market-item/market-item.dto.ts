import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class MarketItemListFilter {
  @Field({ description: "카테고리 이름", nullable: true })
  categoryName?: string;

  @Field({ description: "등급", nullable: true })
  grade?: string;

  @Field(() => Boolean, {
    description: "가격 통계 수집 활성화 여부",
    nullable: true,
  })
  isStatScraperEnabled?: boolean;

  @Field({ description: "검색 키워드", nullable: true })
  keyword?: string;
}
