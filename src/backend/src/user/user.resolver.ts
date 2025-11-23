import { Query, Resolver } from "@nestjs/graphql";
import { User } from "src/common/object/user.object";
import { PrismaService } from "src/prisma";

@Resolver()
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [User])
  async userList() {
    return await this.prisma.user.findMany();
  }
}
