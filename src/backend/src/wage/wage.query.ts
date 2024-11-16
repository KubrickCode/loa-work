import { Int, Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from 'src/prisma';
import { MinimumWage } from './wage.object';

@Resolver()
export class MinimumWageQuery {
  constructor(private prisma: PrismaService) {}

  @Query(() => MinimumWage)
  async minimumWage() {
    const minimumWageList = await this.prisma.minimumWage.findMany();
    const currentYear = new Date().getFullYear();
    const currentMinimumWage = minimumWageList.find(
      (minimumWage) => minimumWage.year === currentYear,
    );

    return currentMinimumWage;
  }
}
