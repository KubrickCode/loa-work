import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { ContentListQuery } from './query/content-list.query';
import { ContentResolver } from './object/content.resolver';
import { ContentRewardViewListQuery } from './query/content-reward-view-list.query';
import { ItemPriceService } from './service/item-price.service';
import { ContentCategoriesQuery } from './query/content-categories.query';
import { ContentWageService } from './service/content-wage.service';

@Module({
  imports: [PrismaModule],
  providers: [
    ContentListQuery,
    ContentRewardViewListQuery,
    ContentResolver,
    ItemPriceService,
    ContentCategoriesQuery,
    ContentWageService,
  ],
})
export class ContentModule {}
