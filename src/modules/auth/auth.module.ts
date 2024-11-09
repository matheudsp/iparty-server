import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService, UserService],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule { }
