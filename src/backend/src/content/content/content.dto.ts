import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { ContentStatus } from "@prisma/client";

@InputType()
export class ContentListFilter {
  @Field({ nullable: true })
  contentCategoryId?: number;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => String, { nullable: true })
  keyword?: string;

  @Field(() => ContentStatus, { nullable: true })
  status?: ContentStatus;
}

@InputType()
export class ContentsFilter {
  @Field(() => [Number], { nullable: true })
  ids?: number[];
}

@InputType()
export class ContentCreateInput {
  @Field()
  categoryId: number;

  @Field(() => [ContentCreateItemsInput])
  contentRewards: ContentCreateItemsInput[];

  @Field(() => [ContentCreateSeeMoreRewardsInput], { nullable: true })
  contentSeeMoreRewards?: ContentCreateSeeMoreRewardsInput[];

  @Field()
  duration: number;

  @Field({ nullable: true })
  gate?: number | null;

  @Field()
  level: number;

  @Field()
  name: string;
}

@InputType()
export class ContentCreateItemsInput {
  @Field(() => Float)
  averageQuantity: number;

  @Field()
  isBound: boolean;

  @Field()
  itemId: number;
}

@InputType()
export class ContentCreateSeeMoreRewardsInput {
  @Field()
  itemId: number;

  @Field(() => Float)
  quantity: number;
}

@ObjectType()
export class ContentCreateResult {
  @Field(() => Boolean)
  ok: boolean;
}
