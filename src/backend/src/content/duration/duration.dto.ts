import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class ContentDurationEditInput {
  @Field()
  contentId: number;

  @Field(() => Int)
  minutes: number;

  @Field(() => Int)
  seconds: number;
}

@ObjectType()
export class ContentDurationEditResult {
  @Field(() => Boolean)
  ok: boolean;
}

@InputType()
export class ContentDurationsEditInputDuration {
  @Field()
  contentId: number;

  @Field(() => Int)
  minutes: number;

  @Field(() => Int)
  seconds: number;
}

@InputType()
export class ContentDurationsEditInput {
  @Field(() => [ContentDurationsEditInputDuration])
  contentDurations: ContentDurationsEditInputDuration[];
}

@ObjectType()
export class ContentDurationsEditResult {
  @Field(() => Boolean)
  ok: boolean;
}
