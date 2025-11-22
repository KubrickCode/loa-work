import { Query, Resolver } from "@nestjs/graphql";
import { ContentCategory } from "../object/content-category.object";
import { ContentCategoryService } from "../service/content-category.service";

@Resolver()
export class ContentCategoriesQuery {
  constructor(private readonly contentCategoryService: ContentCategoryService) {}

  @Query(() => [ContentCategory])
  async contentCategories(): Promise<ContentCategory[]> {
    return this.contentCategoryService.findAll();
  }
}
