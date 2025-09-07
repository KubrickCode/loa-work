import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { ContentListQuery } from './query/content-list.query';
import { ContentResolver } from './object/content.resolver';
import { ItemsQuery } from './query/items.query';
import { ContentCategoriesQuery } from './query/content-categories.query';
import { ContentWageService } from './service/content-wage.service';
import { ContentQuery } from './query/content.query';
import { UserContentRewardsEditMutation } from './mutation/user-content-rewards-edit.mutation';
import { ContentRewardResolver } from './object/content-reward.resolver';
import { UserContentService } from '../user/service/user-content.service';
import { ContentWageListQuery } from './query/content-wage-list.query';
import { ContentWageResolver } from './object/content-wage.resolver';
import { ContentSeeMoreRewardResolver } from './object/content-see-more-reward.resolver';
import { UserContentDurationEditMutation } from './mutation/user-content-duration-edit.mutation';
import { ContentDurationResolver } from './object/content-duration.resolver';
import { ContentDurationQuery } from './query/content-duration.query';
import { UserGoldExchangeRateService } from 'src/user/service/user-gold-exchange-rate.service';
import { ItemResolver } from './object/item.resolver';
import { UserItemEditMutation } from './mutation/user-item-edit.mutation';
import { ItemQuery } from './query/item.query';
import { CustomContentWageCalculateMutation } from './mutation/custom-content-wage-calculate.mutation';
import { ContentRewardsReportMutation } from './mutation/content-rewards-report.mutation';
import { ContentController } from './content.controller';
import { ContentCreateMutation } from './mutation/content-create.mutation';
import { DataLoaderService } from 'src/dataloader/data-loader.service';
import { UserContentSeeMoreRewardsEditMutation } from './mutation/user-content-see-more-rewards-edit.mutation';
import { ContentDurationService } from './service/content-duration.service';
import { ContentGroupResolver } from './object/content-group.resolver';
import { ContentGroupWageListQuery } from './query/content-group-wage-list.query';
import { UserContentDurationsEditMutation } from './mutation/user-content-durations-edit.mutation';
import { ContentsQuery } from './query/contents.query';
import { ContentGroupQuery } from './query/content-group.query';

@Module({
  imports: [PrismaModule],
  controllers: [ContentController],
  providers: [
    ContentListQuery,
    ItemsQuery,
    ContentResolver,
    ContentCategoriesQuery,
    ContentWageService,
    ContentQuery,
    UserContentRewardsEditMutation,
    ContentRewardResolver,
    UserContentService,
    ContentWageListQuery,
    ContentWageResolver,
    ContentSeeMoreRewardResolver,
    UserContentDurationEditMutation,
    ContentDurationResolver,
    ContentDurationQuery,
    UserGoldExchangeRateService,
    ItemResolver,
    UserItemEditMutation,
    ItemQuery,
    CustomContentWageCalculateMutation,
    ContentRewardsReportMutation,
    ContentCreateMutation,
    DataLoaderService,
    UserContentSeeMoreRewardsEditMutation,
    ContentDurationService,
    ContentGroupWageListQuery,
    ContentGroupResolver,
    UserContentDurationsEditMutation,
    ContentsQuery,
    ContentGroupQuery,
  ],
})
export class ContentModule {}
