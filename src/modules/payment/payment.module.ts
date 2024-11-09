import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService,JwtService],
})
export class PaymentModule {}