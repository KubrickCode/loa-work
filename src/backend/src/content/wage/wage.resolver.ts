import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import _ from "lodash";
import { OrderByArg } from "src/common/object/order-by-arg.object";
import { PrismaService } from "src/prisma";
import { Content } from "../content/content.object";
import { ContentDurationService } from "../duration/duration.service";
import { ContentWageService } from "./wage.service";
import {
  ContentWageListFilter,
  CustomContentWageCalculateInput,
  CustomContentWageCalculateResult,
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
    orderBy?: OrderByArg[]
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
      return await this.contentWageService.getContentWage(content.id, {
        includeIsBound: filter?.includeIsBound,
        includeIsSeeMore: filter?.includeIsSeeMore,
        includeItemIds: filter?.includeItemIds,
      });
    });

    const result = orderBy
      ? _.orderBy(
          await Promise.all(promises),
          orderBy.map((order) => order.field),
          orderBy.map((order) => order.order)
        )
      : await Promise.all(promises);

    return result;
  }

  @Mutation(() => CustomContentWageCalculateResult)
  async customContentWageCalculate(@Args("input") input: CustomContentWageCalculateInput) {
    const { items, minutes, seconds } = input;

    const totalSeconds = this.contentDurationService.getValidatedTotalSeconds({
      minutes,
      seconds,
    });

    const rewardsGold = await this.contentWageService.calculateGold(
      items.map((item) => ({
        averageQuantity: item.quantity,
        itemId: item.id,
      }))
    );

    const { goldAmountPerHour, krwAmountPerHour } = await this.contentWageService.calculateWage({
      duration: totalSeconds,
      gold: rewardsGold,
    });

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
