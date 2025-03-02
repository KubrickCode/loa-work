import { Controller, Get, Res } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { Response } from 'express';

@Controller('metrics')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get()
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', 'text/plain');
    res.send(await this.monitoringService.getMetrics());
  }
}
