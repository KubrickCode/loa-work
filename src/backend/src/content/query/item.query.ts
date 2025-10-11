import { Args, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma";
import { Item } from "../object/item.object";

@Resolver()
export class ItemQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => Item)
  async item(@Args("id") id: number) {
    return await this.prisma.item.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
