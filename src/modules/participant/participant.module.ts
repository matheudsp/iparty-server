import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';

import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService, PrismaService, JwtService],
})
export class ParticipantModule {}
