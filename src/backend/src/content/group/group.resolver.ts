import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { DataLoaderService } from "src/dataloader/data-loader.service";
import { ContentCategory } from "../category/category.object";
import { Content } from "../content/content.object";
import { ContentGroupFilter, ContentGroupWageListFilter } from "./group.dto";
import { GroupService } from "./group.service";
import { ContentGroup, ContentGroupWage } from "./group.object";

@Resolver(() => ContentGroup)
export class GroupResolver {
  constructor(
    private groupService: GroupService,
    private dataLoaderService: DataLoaderService
  ) {}

  @Query(() => ContentGroup)
  async contentGroup(@Args("filter", { nullable: true }) filter?: ContentGroupFilter) {
    return await this.groupService.findContentGroup(filter);
  }

  @Query(() => [ContentGroupWage])
  async contentGroupWageList(
    @Args("filter", { nullable: true }) filter?: ContentGroupWageListFilter,
    @Args("orderBy", {
      nullable: true,
      type: () => [OrderByArg],
    })
    orderBy?: OrderByArg[],
    @CurrentUser() user?: User
  ) {
    return await this.groupService.findContentGroupWageList(filter, orderBy, user?.id);
  }

  @ResolveField(() => ContentCategory)
  async contentCategory(@Parent() contentGroup: ContentGroup) {
    return await this.dataLoaderService.contentCategory.findUniqueOrThrowById(
      contentGroup.contentCategoryId
    );
  }

  @ResolveField(() => [Content])
  async contents(@Parent() contentGroup: ContentGroup) {
    return await this.groupService.findContentsByIds(contentGroup.contentIds);
  }

  @ResolveField(() => Number)
  async duration(@Parent() contentGroup: ContentGroup) {
    return await this.groupService.calculateGroupDuration(contentGroup.contentIds);
  }

  @ResolveField(() => String)
  async durationText(@Parent() contentGroup: ContentGroup) {
    const durationInSeconds = await this.duration(contentGroup);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    return seconds === 0 ? `${minutes}분` : `${minutes}분 ${seconds}초`;
  }
}
