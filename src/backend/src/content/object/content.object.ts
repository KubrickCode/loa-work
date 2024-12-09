import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentWageFilter {
  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => [String], { nullable: true })
  includeContentRewardItems?: string[];
}

@ObjectType()
export class Content extends BaseObject {
  @Field(() => Int)
  contentCategoryId: number;

  @Field(() => ContentWageFilter, { nullable: true })
  wageFilter?: ContentWageFilter;

  @Field(() => Int, { nullable: true })
  gate?: number;

  @Field(() => Boolean, { nullable: true })
  isSeeMore?: boolean;

  @Field(() => Int)
  level: number;

  @Field()
  name: string;
}
