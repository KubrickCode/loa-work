import { registerEnumType } from '@nestjs/graphql';
import { ContentType } from '@prisma/client';

registerEnumType(ContentType, {
  name: 'ContentType',
});
