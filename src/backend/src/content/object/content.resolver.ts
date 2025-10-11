import { Args, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/prisma";
import { Content } from "./content.object";
import { ContentReward } from "./content-reward.object";
import { ContentCategory } from "./content-category.object";
import { UserContentService } from "../../user/service/user-content.service";
import { ContentSeeMoreReward } from "./content-see-more-reward.object";
import { DataLoaderService } from "src/dataloader/data-loader.service";
import { ContentWage, ContentWageFilter } from "./content-wage.object";
import { ContentWageService } from "../service/content-wage.service";

@Resolver(() => Content)
export class ContentResolver {
  constructor(
    private prisma: PrismaService,
    private userContentService: UserContentService,
    private dataLoaderService: DataLoaderService,
    private contentWageService: ContentWageService
  ) {}

  @ResolveField(() => ContentCategory)
  async contentCategory(@Parent() content: Content) {
    return await this.dataLoaderService.contentCategory.findUniqueOrThrowById(
      content.contentCategoryId
    );
  }

  @ResolveField(() => [ContentReward])
  async contentRewards(@Parent() content: Content) {
    return await this.dataLoaderService.contentRewards.findManyByContentId(content.id);
  }

  @ResolveField(() => [ContentSeeMoreReward])
  async contentSeeMoreRewards(@Parent() content: Content) {
    return await this.dataLoaderService.contentSeeMoreRewards.findManyByContentId(content.id);
  }

  @ResolveField(() => String)
  async displayName(@Parent() content: Content) {
    const { gate, name } = content;
    return `${name}${gate ? ` ${gate}관문` : ""}`;
  }

  @ResolveField(() => Number)
  async duration(@Parent() content: Content) {
    return await this.userContentService.getContentDuration(content.id);
  }

  @ResolveField(() => String)
  async durationText(@Parent() content: Content) {
    const durationInSeconds = await this.duration(content);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    return seconds === 0 ? `${minutes}분` : `${minutes}분 ${seconds}초`;
  }

  @ResolveField(() => ContentWage)
  async wage(
    @Parent() content: Content,
    @Args("filter", { nullable: true }) filter?: ContentWageFilter
  ) {
    return await this.contentWageService.getContentWage(content.id, filter);
  }
}
