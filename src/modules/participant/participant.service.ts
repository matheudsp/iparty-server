import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { addParticipantDto, ParticipantDto } from './dto/participant.dto';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) { }

  async addToParty(userId: number, dto: addParticipantDto) {
    const { partyId } = dto

    const verifyCreator = await this.prisma.party.findFirst({
      where:{
        creatorId: userId,
        id:partyId
      }
    })

    if(verifyCreator) throw new Error('Anfritriões não podem se inscrever como participantes') 

    return this.prisma.partyParticipant.create({
      data: {
        partyId,
        userId
      },
    });
  }

  async findAllByParty(partyId: number) {
    return this.prisma.partyParticipant.findMany({
      where: {
        partyId
      },
      include:{
        Payment:{
          select:{
            paymentMethod:true,
            status:true,
            createdAt:true,
            amount:true,
          }
        }
      }
    });
  }

  async remove(creatorId: number, dto: ParticipantDto) {
    const { partyId, userId } = dto
    const verifyCreator = await this.prisma.party.findFirst({
      where: {
        id: partyId,
        creatorId,
      },
      select: {
        id: true
      }
    })

    if (!verifyCreator) throw new UnauthorizedException('Somente o anfitriões podem remover participantes.')

    const remove = await this.prisma.partyParticipant.delete({
      where: {
        partyId_userId: { partyId, userId }
      }
    })

    return remove


  }
}