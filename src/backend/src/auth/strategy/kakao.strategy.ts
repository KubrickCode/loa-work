import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthProvider } from '@prisma/client';
import { Strategy } from 'passport-kakao';
import { PrismaService } from 'src/prisma';
import { UserSeedService } from 'src/user/service/user-seed.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
    private userSeedService: UserSeedService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('KAKAO_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('KAKAO_CLIENT_SECRET'),
      callbackURL:
        configService.get<string>('CLIENT_HOST', 'http://localhost:3000') +
        '/auth/kakao/callback',
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: (error: any, user?: any) => void,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        create: {
          displayName: profile._json.properties.nickname,
          email: profile._json.kakao_account.email,
          imageUrl: profile._json.properties.profile_image,
          provider: AuthProvider.KAKAO,
          refId: profile.id.toString(),
        },
        update: {
          displayName: profile._json.properties.nickname,
          email: profile._json.kakao_account.email,
          imageUrl: profile._json.properties.profile_image,
        },
        where: {
          refId: profile.id.toString(),
        },
      });

      await this.userSeedService.makeAllSeedData(user.id, tx);

      done(undefined, user);
    });
  }
}
