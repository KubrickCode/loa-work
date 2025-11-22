import { Field, Float, ObjectType } from "@nestjs/graphql";
import { Decimal } from "@prisma/client/runtime/library";
import { BaseObject } from "src/common/object/base.object";

@ObjectType({ description: "경매장 아이템" })
export class AuctionItem extends BaseObject {
  @Field(() => Float, { description: "평균 낙찰가" })
  avgBuyPrice: Decimal | number;

  @Field(() => String, { description: "아이템 이미지 URL" })
  imageUrl: string;

  @Field(() => Boolean, { description: "통계 수집 활성화 여부" })
  isStatScraperEnabled: boolean;

  @Field(() => String, { description: "아이템명" })
  name: string;
}
