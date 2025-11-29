import {
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { AuthProvider } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaService } from "src/prisma";

const E2E_TEST_USER = {
  displayName: "E2E Test User",
  email: "e2e-test@example.com",
  provider: AuthProvider.GOOGLE,
  refId: "e2e-test-user-ref-id",
};

@Controller("auth")
export class AuthController {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {}

  @Get("check")
  async check(@Req() req: Request) {
    return req.user ?? "null";
  }

  @Get("discord/callback")
  @UseGuards(AuthGuard("discord"))
  async discordCallback(@Req() req: Request, @Res() res: Response) {
    req.session["passport"] = {
      user: req.user,
    };

    return res.redirect(this.configService.get<string>("CLIENT_HOST", "http://localhost:3000/"));
  }

  @Get("discord")
  @UseGuards(AuthGuard("discord"))
  async discordLogin(@Req() req: Request) {
    return req.user;
  }

  @Post("e2e-login")
  async e2eLogin(@Req() req: Request) {
    if (process.env.NODE_ENV === "production") {
      throw new ForbiddenException("E2E login is disabled in production");
    }

    const user = await this.prisma.user.upsert({
      create: E2E_TEST_USER,
      update: {},
      where: { refId: E2E_TEST_USER.refId },
    });

    req.session["passport"] = { user };

    return user;
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    req.session["passport"] = {
      user: req.user,
    };

    return res.redirect(this.configService.get<string>("CLIENT_HOST", "http://localhost:3000/"));
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleLogin(@Req() req: Request) {
    return req.user;
  }

  @Get("kakao/callback")
  @UseGuards(AuthGuard("kakao"))
  async kakaoCallback(@Req() req: Request, @Res() res: Response) {
    req.session["passport"] = {
      user: req.user,
    };

    return res.redirect(this.configService.get<string>("CLIENT_HOST", "http://localhost:3000/"));
  }

  @Get("kakao")
  @UseGuards(AuthGuard("kakao"))
  async kakaoLogin(@Req() req: Request) {
    return req.user;
  }

  @Post("logout")
  async logout(@Req() req: Request): Promise<{
    ok: boolean;
  }> {
    return new Promise((resolve, reject) => {
      req.logout((error) => {
        if (error) {
          reject(new HttpException("Logout failed", HttpStatus.INTERNAL_SERVER_ERROR));
        } else {
          resolve({ ok: true });
        }
      });
    });
  }
}
