import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthProvider } from '@prisma/client';
import { Strategy } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma';
import { UserSeedService } from 'src/user/service/user-seed.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
    private userSeedService: UserSeedService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL:
        configService.get<string>('CLIENT_HOST', 'http://localhost:3000') +
        '/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
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

      await this.userSeedService.makeAllSeedData(user.id, tx);

      return user;
    });
  }
}
