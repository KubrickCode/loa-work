import { registerEnumType } from '@nestjs/graphql';

export enum ContentRewardKind {
  GOLD = '골드',
  SHILLING = '실링',
  FATE_FRAGMENT = '운명의 파편',
  FATE_BREAKTHROUGH_STONE = '운명의 돌파석',
  FATE_DESTRUCTION_STONE = '운명의 파괴석',
  FATE_GUARDIAN_STONE = '운명의 수호석',
  LEVEL_1_GEM = '1레벨 보석',
  LAVA_BREATH = '용암의 숨결',
  GLACIER_BREATH = '빙하의 숨결',
  CARD_EXP = '카드 경험치',
}

registerEnumType(ContentRewardKind, {
  name: 'ContentRewardKind',
});
