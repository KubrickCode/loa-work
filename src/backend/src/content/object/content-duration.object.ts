import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentDuration extends BaseObject {
  @Field(() => Int)
  contentId: number;

  @Field(() => Int)
  defaultValue: number;
}
