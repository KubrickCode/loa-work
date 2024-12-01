import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Get('check')
  async check(@Req() req: Request) {
    return req.user ?? 'null';
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req: Request, @Res() res: Response) {
    req.session['passport'] = {
      user: req.user,
    };

    return res.redirect(
      this.configService.get<string>(
        'GOOGLE_AUTH_SUCCESS_URL',
        'http://localhost:3000/',
      ),
    );
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    return req.logout((error) => console.error(error));
  }
}
