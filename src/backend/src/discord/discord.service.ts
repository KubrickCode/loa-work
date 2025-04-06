import { Webhook } from 'discord-webhook-node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordService {
  private webhook: Webhook;

  constructor(private configService: ConfigService) {
    this.webhook = new Webhook(
      this.configService.get<string>('DISCORD_GOLD_EXCHANGE_RATE_WEBHOOK_URL'),
    );
  }

  async sendMessage(message: string) {
    await this.webhook.send(message);
  }
}
