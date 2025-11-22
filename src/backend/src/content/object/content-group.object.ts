import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ContentGroup {
  @Field(() => Int, { description: "컨텐츠 카테고리 ID" })
  contentCategoryId: number;

  @Field(() => [Int], { description: "컨텐츠 ID 목록" })
  contentIds: number[];

  @Field(() => Int, { description: "레벨" })
  level: number;

  @Field(() => String, { description: "이름" })
  name: string;
}
