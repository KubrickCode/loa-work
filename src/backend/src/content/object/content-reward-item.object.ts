import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ContentRewardItemKind } from '@prisma/client';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class ContentRewardItem extends BaseObject {
  @Field(() => ContentRewardItemKind)
  kind: ContentRewardItemKind;

  @Field()
  name: string;

  @Field(() => Float)
  defaultPrice: number;
}
