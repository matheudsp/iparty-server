import { Module } from '@nestjs/common';
import { PartyService } from './party.service';
import { PartyController } from './party.controller';

import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({

  controllers: [PartyController],
  providers: [PartyService, PrismaService, JwtService],
})
export class PartyModule {}
