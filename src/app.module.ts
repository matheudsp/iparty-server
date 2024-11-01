import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PartyModule } from './modules/party/party.module';
import { ParticipantModule } from './modules/participant/participant.module';
import { PaymentModule } from './modules/payment/payment.module';


@Module({
  imports: [AuthModule,UserModule, PartyModule, ParticipantModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
