import { Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma";
import { ContentCategory } from "./category.object";

@Resolver()
export class CategoryResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ContentCategory])
  async contentCategories() {
    return await this.prisma.contentCategory.findMany();
  }
}
