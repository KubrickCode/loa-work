import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Prisma, User } from "@prisma/client";
import { orderBy } from "es-toolkit/compat";
import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { PrismaService } from "src/prisma";
import { Content } from "../content/content.object";
import { ContentDurationService } from "../duration/duration.service";
import { ContentWageService } from "./wage.service";
import {
  CalculateCustomContentWageInput,
  CalculateCustomContentWageResult,
  ContentWageListFilter,
} from "./wage.dto";
import { ContentWage } from "./wage.object";

@Resolver(() => ContentWage)
export class WageResolver {
  constructor(
    private prisma: PrismaService,
    private contentWageService: ContentWageService,
    private contentDurationService: ContentDurationService
  ) {}

  @Query(() => [ContentWage])
  async contentWageList(
    @Args("filter", { nullable: true }) filter?: ContentWageListFilter,
    @Args("orderBy", {
      nullable: true,
      type: () => [OrderByArg],
    })
    orderByArgs?: OrderByArg[],
    @CurrentUser() user?: User
  ) {
    const contents = await this.prisma.content.findMany({
      include: {
        contentSeeMoreRewards: {
          include: {
            item: true,
          },
        },
      },
      orderBy: [
        {
          contentCategory: {
            id: "asc",
          },
        },
        {
          level: "asc",
        },
        {
          id: "asc",
        },
      ],
      where: this.buildContentWageListWhereArgs(filter),
    });

    const promises = contents.map(async (content) => {
      return await this.contentWageService.getContentWage(content.id, user?.id, {
        includeBound: filter?.includeBound,
        includeItemIds: filter?.includeItemIds,
        includeSeeMore: filter?.includeSeeMore,
      });
    });

    const results = await Promise.all(promises);

    return orderByArgs
      ? orderBy(
          results,
          orderByArgs.map((o) => o.field),
          orderByArgs.map((o) => o.order)
        )
      : results;
  }

  @Mutation(() => CalculateCustomContentWageResult)
  async customContentWageCalculate(
    @Args("input") input: CalculateCustomContentWageInput,
    @CurrentUser() user?: User
  ) {
    const { items, minutes, seconds } = input;

    const totalSeconds = this.contentDurationService.getValidatedTotalSeconds({
      minutes,
      seconds,
    });

    const rewardsGold = await this.contentWageService.calculateGold(
      items.map((item) => ({
        averageQuantity: item.quantity,
        itemId: item.id,
      })),
      user?.id
    );

    const { goldAmountPerHour, krwAmountPerHour } = await this.contentWageService.calculateWage(
      {
        duration: totalSeconds,
        gold: rewardsGold,
      },
      user?.id
    );

    return {
      goldAmountPerClear: Math.round(rewardsGold),
      goldAmountPerHour,
      krwAmountPerHour,
      ok: true,
    };
  }

  @ResolveField(() => Content)
  async content(@Parent() contentWage: ContentWage) {
    return await this.prisma.content.findUniqueOrThrow({
      where: {
        id: contentWage.contentId,
      },
    });
  }

  buildContentWageListWhereArgs(filter?: ContentWageListFilter) {
    const where: Prisma.ContentWhereInput = {};

    if (filter?.contentCategoryId) {
      where.contentCategoryId = filter.contentCategoryId;
    }

    if (filter?.keyword) {
      where.OR = [
        {
          name: {
            contains: filter.keyword,
            mode: "insensitive",
          },
        },
        {
          contentCategory: {
            name: {
              contains: filter.keyword,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    if (filter?.status) {
      where.status = filter.status;
    }

    return where;
  }
}
