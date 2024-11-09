import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { LoginDto } from './dto/auth.dto';



@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    console.log('refreshed');

    return await this.authService.refreshToken(req.user);
  }
}
