import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { PrismaService } from "src/prisma";

@Module({
  exports: [ConfigModule, PrismaService],
  imports: [ConfigModule],
  providers: [ConfigService, PrismaService],
})
export class CommonModule {}
