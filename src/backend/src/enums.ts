import { registerEnumType } from '@nestjs/graphql';
import {
  AuthProvider,
  ItemKind,
  ContentStatus,
  UserRole,
} from '@prisma/client';

registerEnumType(ItemKind, {
  name: 'ItemKind',
});

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
});

registerEnumType(UserRole, {
  name: 'UserRole',
});

registerEnumType(ContentStatus, {
  name: 'ContentStatus',
});
