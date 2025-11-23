import { Float, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { ContentReward } from "./content-reward.object";
import { Item } from "./item.object";
import { UserContentService } from "../../user/service/user-content.service";
import { DataLoaderService } from "src/dataloader/data-loader.service";

@Resolver(() => ContentReward)
export class ContentRewardResolver {
  constructor(
    private readonly dataLoaderService: DataLoaderService,
    private readonly userContentService: UserContentService
  ) {}

  @ResolveField(() => Float, {
    description: "사용자 커스텀 값이 반영된 평균 획득 수량",
  })
  async averageQuantity(@Parent() reward: ContentReward): Promise<number> {
    const value = await this.userContentService.getContentRewardAverageQuantity(reward.id);
    return value.toNumber();
  }

  @ResolveField(() => Boolean, {
    description: "사용자 커스텀 값이 반영된 거래 가능 여부",
  })
  async isSellable(@Parent() reward: ContentReward): Promise<boolean> {
    return await this.userContentService.getContentRewardIsSellable(reward.id);
  }

  @ResolveField(() => Item, { description: "연결된 아이템 정보" })
  async item(@Parent() reward: ContentReward): Promise<Item> {
    return await this.dataLoaderService.item.findUniqueOrThrowById(reward.itemId);
  }
}
