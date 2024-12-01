import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  providers: [ConfigService, PrismaService],
  exports: [ConfigModule, PrismaService],
})
export class CommonModule {}
