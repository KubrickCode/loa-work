import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMinimumWage() {
    const minimumWageList = await this.prismaService.minimumWage.findMany();
    const currentYear = new Date().getFullYear();
    const currentMinimumWage = minimumWageList.find(
      (minimumWage) => minimumWage.year === currentYear,
    );

    return currentMinimumWage.amount;
  }
}
