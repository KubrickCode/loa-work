import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { ContentListQuery } from './query/content-list.query';

@Module({
  imports: [PrismaModule],
  providers: [ContentListQuery],
})
export class ContentModule {}
