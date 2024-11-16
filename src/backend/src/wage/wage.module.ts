import { Module } from '@nestjs/common';
import { MinimumWageQuery } from './wage.query';
import { PrismaModule } from 'src/prisma';

@Module({
  imports: [PrismaModule],
  providers: [MinimumWageQuery],
})
export class MinimumWageModule {}
