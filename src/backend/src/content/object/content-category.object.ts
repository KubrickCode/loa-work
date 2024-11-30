import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentCategory extends BaseObject {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
