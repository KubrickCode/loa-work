import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class ContentDurationEditInput {
  @Field({ description: "컨텐츠 ID" })
  contentId: number;

  @Field(() => Int, { description: "분" })
  minutes: number;

  @Field(() => Int, { description: "초" })
  seconds: number;
}

@ObjectType()
export class ContentDurationEditResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}

@InputType()
export class ContentDurationsEditInput {
  @Field(() => [ContentDurationEditInput], {
    description: "컨텐츠 소요 시간 목록",
  })
  contentDurations: ContentDurationEditInput[];
}

@ObjectType()
export class ContentDurationsEditResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
