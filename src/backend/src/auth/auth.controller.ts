import {
  Controller,
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
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private configService: ConfigService) {}

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
