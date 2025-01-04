import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContentWithHistories {
  @Field(() => Int)
  contentId: number;

  @Field(() => [ContentWageHistory])
  histories: ContentWageHistory[];
}

@ObjectType()
export class ContentWageHistory {
  @Field()
  date: string;

  @Field(() => Int)
  goldAmountPerHour: number;
}
