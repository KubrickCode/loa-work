import { Module } from "@nestjs/common";
import { DiscordService } from "./discord.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  exports: [DiscordService],
  imports: [ConfigModule],
  providers: [DiscordService],
})
export class DiscordModule {}
