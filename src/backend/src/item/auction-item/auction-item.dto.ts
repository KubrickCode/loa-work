import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AuctionItemListFilter {
  @Field(() => Boolean, {
    description: "가격 통계 수집 활성화 여부",
    nullable: true,
  })
  isStatScraperEnabled?: boolean;

  @Field(() => String, {
    description: "아이템 이름 검색 키워드",
    nullable: true,
  })
  nameKeyword?: string;
}
