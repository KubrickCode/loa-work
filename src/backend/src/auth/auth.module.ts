import { ConfigService } from "@nestjs/config";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import passport from "passport";
import session from "express-session";
import { PrismaModule, PrismaService } from "src/prisma";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./strategy/google.strategy";
import { Serializer } from "./serializer";
import { CommonModule } from "src/common/common.module";
import { DiscordStrategy } from "./strategy/discord.strategy";
import { UserSeedService } from "src/user/service/user-seed.service";
import { KakaoStrategy } from "./strategy/kakao.strategy";

@Module({
  controllers: [AuthController],
  imports: [CommonModule, PassportModule.register({ session: true }), PrismaModule],
  providers: [GoogleStrategy, DiscordStrategy, KakaoStrategy, Serializer, UserSeedService],
})
export class AuthModule implements NestModule {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          cookie: {
            httpOnly: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // ms
            sameSite: true,
          },
          resave: false,
          saveUninitialized: false,
          secret: this.configService.get<string>("SESSION_SECRET", "__UNSAFE__SECRET__"),
          store: new PrismaSessionStore(this.prisma, {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdFunction: undefined,
            dbRecordIdIsSessionId: true,
          }),
        }),
        passport.initialize(),
        passport.session()
      )
      .forRoutes("*");
  }
}
