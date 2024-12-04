import { Query, Resolver } from '@nestjs/graphql';
import { ContentRewardKind } from 'src/enums';

@Resolver()
export class ContentRewardItemsQuery {
  constructor() {}

  @Query(() => [String])
  contentRewardItems() {
    return Object.values(ContentRewardKind);
  }
}
