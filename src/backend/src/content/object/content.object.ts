import { Field, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentObjectWageFilter {
  @Field(() => Boolean, { nullable: true })
  includeIsBound?: boolean;

  @Field(() => Boolean, { nullable: true })
  includeIsSeeMore?: boolean;

  @Field(() => [String], { nullable: true })
  includeItemIds?: string[];
}

@ObjectType()
export class Content extends BaseObject {
  @Field()
  contentCategoryId: number;

  @Field(() => ContentObjectWageFilter, { nullable: true })
  wageFilter?: ContentObjectWageFilter;

  @Field({ nullable: true })
  gate?: number;

  @Field()
  level: number;

  @Field()
  name: string;
}
