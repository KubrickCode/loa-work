import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ContentRewardViewListQuery {
  constructor() {}

  @Query(() => [String])
  async contentRewardViewList() {
    return [
      '골드',
      '실링',
      '운명의 파편',
      '운명의 돌파석',
      '운명의 파괴석',
      '운명의 수호석',
      '1레벨 보석',
      '용암의 숨결',
      '빙하의 숨결',
      '카드 경험치',
    ];
  }
}
