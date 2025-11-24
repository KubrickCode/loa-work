import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class EditContentDurationInput {
  @Field({ description: "컨텐츠 ID" })
  contentId: number;

  @Field(() => Int, { description: "분" })
  minutes: number;

  @Field(() => Int, { description: "초" })
  seconds: number;
}

@ObjectType()
export class EditContentDurationResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}

@InputType()
export class EditContentDurationsDurationInput {
  @Field({ description: "컨텐츠 ID" })
  contentId: number;

  @Field(() => Int, { description: "분" })
  minutes: number;

  @Field(() => Int, { description: "초" })
  seconds: number;
}

@InputType()
export class EditContentDurationsInput {
  @Field(() => [EditContentDurationsDurationInput], {
    description: "수정할 컨텐츠 소요 시간 목록",
  })
  contentDurations: EditContentDurationsDurationInput[];
}

@ObjectType()
export class EditContentDurationsResult {
  @Field(() => Boolean, { description: "성공 여부" })
  ok: boolean;
}
