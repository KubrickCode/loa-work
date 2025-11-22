import { Injectable } from "@nestjs/common";
import { ContentCategory } from "@prisma/client";
import { PrismaService } from "src/prisma";

@Injectable()
export class ContentCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ContentCategory[]> {
    return this.prisma.contentCategory.findMany({
      orderBy: { id: "asc" },
    });
  }
}
