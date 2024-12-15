import { registerEnumType } from '@nestjs/graphql';
import { ContentRewardItemKind } from '@prisma/client';

registerEnumType(ContentRewardItemKind, {
  name: 'ContentRewardItemKind',
});
