import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  exports: [ConfigModule],
  imports: [ConfigModule],
  providers: [ConfigService],
})
export class CommonModule {}
