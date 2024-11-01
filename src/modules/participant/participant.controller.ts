import { Controller, Get, Post, Body, Param, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { addParticipantDto, ParticipantDto } from './dto/participant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/modules/auth/decorators/user.decorator';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@ApiTags('participant')
@ApiBearerAuth('access-token')
@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) { }

  @Auth()
  @Post()
  addToParty(@CurrentUser('id') userId: number, @Body() dto: addParticipantDto) {
    return this.participantService.addToParty(userId, dto)
  }

  @Get()
  listParticipants(@Param('id') partyId: number){
    return this.participantService.findAllByParty(partyId)
  }

  @Auth()
  @Delete(':id')
  remove(@CurrentUser('id') creatorId: number, @Body() dto: ParticipantDto) {
    return this.participantService.remove(creatorId, dto);
  }
}
