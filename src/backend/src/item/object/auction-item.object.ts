import { Field, ObjectType } from '@nestjs/graphql';
import { BaseObject } from 'src/common/object/base.object';

@ObjectType()
export class AuctionItem extends BaseObject {
  @Field()
  imageUrl: string;

  @Field()
  isStatScraperEnabled: boolean;

  @Field()
  name: string;
}
