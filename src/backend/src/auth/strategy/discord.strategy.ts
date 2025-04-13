import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthProvider } from '@prisma/client';
import { Strategy, Profile } from 'passport-discord';
import { PrismaService } from 'src/prisma';
import { UserSeedService } from 'src/user/service/user-seed.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
    private userSeedService: UserSeedService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('DISCORD_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('DISCORD_CLIENT_SECRET'),
      callbackURL:
        configService.get<string>('CLIENT_HOST', 'http://localhost:3000') +
        '/auth/discord/callback',
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

      await this.userSeedService.makeAllSeedData(user.id, tx);

      done(undefined, user);
    });
  }
}
