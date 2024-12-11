import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthProvider } from '@prisma/client';
import { Strategy, Profile } from 'passport-discord';
import { PrismaService } from 'src/prisma';
import { AuthService } from '../auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('DISCORD_CLIENT_ID'),
      clientSecret: configService.get<string>('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get<string>('DISCORD_AUTH_CALLBACK_URL'),
      scope: ['identify', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: any, user?: any) => void,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        include: {
          userContentRewards: true,
          userContentDurations: true,
          userContentRewardItems: true,
        },
        create: {
          displayName: profile.username,
          email: profile.email,
          imageUrl: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            : null,
          provider: AuthProvider.DISCORD,
          refId: profile.id,
        },
        update: {
          displayName: profile.username,
          email: profile.email,
          imageUrl: profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            : null,
        },
        where: {
          refId: profile.id,
        },
      });

      if (!user.userContentRewards.length) {
        await this.authService.makeUserContentRewards(user.id, tx);
      }

      if (!user.userContentDurations.length) {
        await this.authService.makeContentDurations(user.id, tx);
      }

      if (!user.userContentRewardItems.length) {
        await this.authService.makeUserContentRewardItems(user.id, tx);
      }

      done(undefined, user);
    });
  }
}
