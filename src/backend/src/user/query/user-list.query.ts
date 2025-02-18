import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma';
import { User } from 'src/common/object/user.object';

@Resolver()
export class UserListQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => [User])
  async userList() {
    return await this.prisma.user.findMany();
  }
}
