import { Query, Resolver } from '@nestjs/graphql';
import { ContentRewardKind } from 'src/enums';

@Resolver()
export class ContentRewardItemListQuery {
  constructor() {}

  @Query(() => [String])
  contentRewardItemList() {
    return Object.values(ContentRewardKind);
  }
}
