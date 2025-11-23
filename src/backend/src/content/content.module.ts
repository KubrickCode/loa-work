import { Module } from "@nestjs/common";
import { DataLoaderService } from "src/dataloader/data-loader.service";
import { PrismaModule } from "src/prisma";
import { UserContentService } from "../user/service/user-content.service";
import { UserGoldExchangeRateService } from "../user/service/user-gold-exchange-rate.service";
import { CategoryResolver } from "./category/category.resolver";
import { ContentResolver } from "./content/content.resolver";
import { ContentService } from "./content/content.service";
import { ContentDurationService } from "./duration/duration.service";
import { DurationResolver } from "./duration/duration.resolver";
import { GroupResolver } from "./group/group.resolver";
import { GroupService } from "./group/group.service";
import { ItemResolver } from "./item/item.resolver";
import { ItemService } from "./item/item.service";
import { RewardResolver } from "./reward/reward.resolver";
import { RewardService } from "./reward/reward.service";
import { SeeMoreRewardResolver } from "./see-more-reward/see-more-reward.resolver";
import { SeeMoreRewardService } from "./see-more-reward/see-more-reward.service";
import { ContentController } from "./shared/content.controller";
import { ContentWageService } from "./wage/wage.service";
import { WageResolver } from "./wage/wage.resolver";

@Module({
  controllers: [ContentController],
  imports: [PrismaModule],
  providers: [
    CategoryResolver,
    ContentDurationService,
    ContentResolver,
    ContentService,
    ContentWageService,
    DataLoaderService,
    DurationResolver,
    GroupResolver,
    GroupService,
    ItemResolver,
    ItemService,
    RewardResolver,
    RewardService,
    SeeMoreRewardResolver,
    SeeMoreRewardService,
    UserContentService,
    UserGoldExchangeRateService,
    WageResolver,
  ],
})
export class ContentModule {}
