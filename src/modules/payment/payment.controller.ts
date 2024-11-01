import { Controller, Get, Post, Body, Param, Put, Delete, Request, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/modules/auth/decorators/user.decorator';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { PaymentService } from './payment.service';

@ApiTags('payment')
@ApiBearerAuth('access-token')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  
  
  @Get('by-party')
  getByPartyId(@Param('id') partyId: number){
    return this.paymentService.getAllByParty(partyId)
  }
  
  @Get('by-user')
  getByUserId(@CurrentUser('id') userId: number){
    return this.paymentService.getAllByUser(userId)
  }
}
