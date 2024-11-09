import { Controller, Get, Post, Body, Param, Put, Delete, Request, UseGuards, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/modules/auth/decorators/user.decorator';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';

@ApiTags('payment')
@ApiBearerAuth('access-token')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  newPayment(@Body() dto: PaymentDto, @CurrentUser('id') userId: number) {
    return this.paymentService.create(userId, dto)
  }


  @Get('by-party')
  getByPartyId(@Param('id') partyId: number) {
    return this.paymentService.getAllByParty(partyId)
  }

  @Auth()
  @Get('by-user')
  getByUserId(@CurrentUser('id') userId: number) {
    return this.paymentService.getAllByUser(userId)
  }
}
