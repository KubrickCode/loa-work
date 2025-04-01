import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ContentGroup } from './content-group.object';

@ObjectType()
export class ContentGroupWage {
  @Field(() => ContentGroup)
  contentGroup: ContentGroup;

  @Field(() => Float)
  krwAmountPerHour: number;

  @Field(() => Float)
  goldAmountPerHour: number;

  @Field(() => Float)
  goldAmountPerClear: number;
}
