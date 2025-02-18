import { registerEnumType } from '@nestjs/graphql';
import { AuthProvider, ContentRewardItemKind, UserRole } from '@prisma/client';

registerEnumType(ContentRewardItemKind, {
  name: 'ContentRewardItemKind',
});

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
});

registerEnumType(UserRole, {
  name: 'UserRole',
});
