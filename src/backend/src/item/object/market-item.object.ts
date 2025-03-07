import { Field, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class MarketItem extends BaseObject {
  @Field()
  bundleCount: number;

  @Field()
  imageUrl: string;

  @Field()
  isStatScraperEnabled: boolean;

  @Field()
  name: string;

  @Field()
  refId: number;
}
