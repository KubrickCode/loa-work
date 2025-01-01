import { ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import passport from 'passport';
import session from 'express-session';
import { PrismaService } from 'src/prisma';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { Serializer } from './serializer';
import { CommonModule } from 'src/common/common.module';
import { DiscordStrategy } from './strategy/discord.strategy';
import { UserSeedService } from 'src/user/service/user-seed.service';
import { KakaoStrategy } from './strategy/kakao.strategy';

@Module({
  imports: [CommonModule, PassportModule.register({ session: true })],
  providers: [
    GoogleStrategy,
    DiscordStrategy,
    KakaoStrategy,
    Serializer,
    UserSeedService,
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const isDevelopment = this.configService.get('NODE_ENV') === 'development';

    consumer
      .apply(
        session({
          cookie: {
            sameSite: 'lax',
            secure: !isDevelopment,
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // ms
            domain: this.configService.get('CLIENT_DOMAIN'),
          },
          resave: false,
          saveUninitialized: false,
          secret: this.configService.get<string>(
            'SESSION_SECRET',
            '__UNSAFE__SECRET__',
          ),
          store: new PrismaSessionStore(this.prisma, {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
          }),
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
