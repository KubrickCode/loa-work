import { Field, ObjectType } from '@nestjs/graphql';
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
  @Field()
  contentCategoryId: number;

  @Field(() => ContentWageFilter, { nullable: true })
  wageFilter?: ContentWageFilter;

  @Field({ nullable: true })
  gate?: number;

  @Field()
  level: number;

  @Field()
  name: string;
}
