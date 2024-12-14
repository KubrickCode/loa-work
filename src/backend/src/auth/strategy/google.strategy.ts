import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthProvider } from '@prisma/client';
import { OAuth2Strategy, VerifyFunction } from 'passport-google-oauth';
import { PrismaService } from 'src/prisma';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyFunction,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        include: {
          userContentRewards: true,
          userContentDurations: true,
          userContentRewardItems: true,
          userGoldExchangeRate: true,
        },
        create: {
          displayName: profile.displayName,
          email: profile.emails[0].value,
          imageUrl: profile.photos[0].value,
          provider: AuthProvider.GOOGLE,
          refId: profile.id,
        },
        update: {
          displayName: profile.displayName,
          email: profile.emails[0].value,
          imageUrl: profile.photos ? profile.photos[0].value : null,
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

      if (!user.userGoldExchangeRate) {
        await this.authService.makeUserGoldExchangeRate(user.id, tx);
      }

      done(undefined, user);
    });
  }
}
