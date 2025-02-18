import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { UserListQuery } from './query/user-list.query';

@Module({
  imports: [PrismaModule],
  providers: [UserListQuery],
})
export class UserModule {}
