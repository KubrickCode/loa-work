import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ContentStatus } from "@prisma/client";
import { BaseObject } from "src/common/object/base.object";

@ObjectType()
export class Content extends BaseObject {
  @Field(() => Int, { description: "컨텐츠 카테고리 ID" })
  contentCategoryId: number;

  @Field(() => Int, { description: "관문", nullable: true })
  gate?: number;

  @Field(() => Int, { description: "레벨" })
  level: number;

  @Field(() => String, { description: "이름" })
  name: string;

  @Field(() => ContentStatus, { description: "상태" })
  status: ContentStatus;
}
