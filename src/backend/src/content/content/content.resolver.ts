import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { DataLoaderService } from "src/dataloader/data-loader.service";
import { UserContentService } from "src/user/service/user-content.service";
import { ContentCategory } from "../category/category.object";
import { ContentReward } from "../reward/reward.object";
import { ContentSeeMoreReward } from "../see-more-reward/see-more-reward.object";
import { ContentWageService } from "../wage/wage.service";
import { ContentWageFilter } from "../wage/wage.dto";
import { ContentWage } from "../wage/wage.object";
import {
  ContentListFilter,
  ContentsFilter,
  CreateContentInput,
  CreateContentResult,
} from "./content.dto";
import { ContentService } from "./content.service";
import { Content } from "./content.object";

@Resolver(() => Content)
export class ContentResolver {
  constructor(
    private contentService: ContentService,
    private userContentService: UserContentService,
    private dataLoaderService: DataLoaderService,
    private contentWageService: ContentWageService
  ) {}

  @Query(() => Content)
  async content(@Args("id") id: number) {
    return await this.contentService.findContentById(id);
  }

  @Query(() => [Content])
  async contentList(
    @Args("filter", { nullable: true }) filter?: ContentListFilter,
    @Args("orderBy", { nullable: true, type: () => [OrderByArg] }) orderBy?: OrderByArg[]
  ) {
    return await this.contentService.findContentList(filter, orderBy);
  }

  @Query(() => [Content])
  async contents(@Args("filter", { nullable: true }) filter?: ContentsFilter) {
    return await this.contentService.findContents(filter);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CreateContentResult)
  async contentCreate(@Args("input") input: CreateContentInput) {
    return await this.contentService.createContent(input);
  }

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
  async duration(@Parent() content: Content, @CurrentUser() user?: User) {
    return await this.userContentService.getContentDuration(content.id, user?.id);
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
    @Args("filter", { nullable: true }) filter?: ContentWageFilter,
    @CurrentUser() user?: User
  ) {
    return await this.contentWageService.getContentWage(content.id, user?.id, filter);
  }
}
