import { Module } from '@nestjs/common';
import { ConsoleModule as NestConsoleModule } from 'nestjs-console';
import { PrismaModule } from 'src/prisma';
import { SeedService } from './services/seed.service';
import { ConsoleService } from './services/console.service';

@Module({
  imports: [NestConsoleModule, PrismaModule],
  providers: [ConsoleService, SeedService],
})
export class ConsoleModule {}
