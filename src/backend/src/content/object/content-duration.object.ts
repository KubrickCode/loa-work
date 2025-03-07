import { Field, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentDuration extends BaseObject {
  @Field()
  contentId: number;

  @Field()
  defaultValue: number;
}
