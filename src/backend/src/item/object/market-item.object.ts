import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Decimal } from "@prisma/client/runtime/library";
import { BaseObject } from "src/common/object/base.object";

@ObjectType({ description: "거래소 아이템" })
export class MarketItem extends BaseObject {
  @Field(() => Int, { description: "묶음 개수" })
  bundleCount: number;

  @Field(() => Float, { description: "현재 최저가" })
  currentMinPrice: number;

  @Field(() => String, { description: "아이템 이미지 URL" })
  imageUrl: string;

  @Field(() => Boolean, { description: "통계 수집 활성화 여부" })
  isStatScraperEnabled: boolean;

  @Field(() => String, { description: "아이템명" })
  name: string;

  @Field(() => Float, { description: "최근 거래가" })
  recentPrice: number;

  @Field(() => Int, { description: "Lost Ark API Reference ID" })
  refId: number;

  @Field(() => Float, { description: "전일 평균 거래가" })
  yDayAvgPrice: Decimal | number;
}
