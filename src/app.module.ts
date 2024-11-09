import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PartyModule } from './modules/party/party.module';
import { ParticipantModule } from './modules/participant/participant.module';
import { PaymentModule } from './modules/payment/payment.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PartyModule,
    ParticipantModule,
    PaymentModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
