import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PartyModule } from './modules/party/party.module';
import { ParticipantModule } from './modules/participant/participant.module';


@Module({
  imports: [AuthModule,UserModule, PartyModule, ParticipantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
