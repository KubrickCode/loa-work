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
    const user = await this.prisma.user.upsert({
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
      include: { contentRewards: true },
    });

    if (!user.contentRewards.length) {
      await this.authService.copyOwnerContentRewards(user.id);
    }

    done(undefined, user);
  }
}
