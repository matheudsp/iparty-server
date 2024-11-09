import { Controller, Get, Post, Body, Param, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { PartyService } from './party.service';
import { CreatePartyDto, UpdatePartyDto } from './dto/party.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/modules/auth/decorators/user.decorator';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@ApiTags('party')
@ApiBearerAuth('access-token')
@Controller('parties')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Auth()
  @Post()
  create(@Body() dto: CreatePartyDto, @CurrentUser('id') userId: number ) {
    return this.partyService.create(userId, dto);
  }
  
  @Auth()
  @Get()
  findAll() {
    return this.partyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.partyService.findOne(+id);
  }

  @Get('by-slug/:slug')
  findBySlug(@Param('partySlug') partySlug: string) {
    return this.partyService.findBySlug(partySlug);
  }

  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePartyDto) {
    return this.partyService.update(+id, dto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partyService.remove(+id);
  }
}
