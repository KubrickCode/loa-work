import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { PrismaService } from "src/prisma";

@Module({
  imports: [ConfigModule],
  providers: [ConfigService, PrismaService],
  exports: [ConfigModule, PrismaService],
})
export class CommonModule {}
