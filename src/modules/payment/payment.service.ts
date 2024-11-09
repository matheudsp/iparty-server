


import { Injectable } from '@nestjs/common';
// import Stripe from 'stripe'

import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentDto } from './dto/payment.dto';


@Injectable()
export class PaymentService {
    // private stripe: Stripe
    constructor(private readonly prisma: PrismaService) {
        // this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    }

    async create(userId: number, dto: PaymentDto) {
        const { amount, partyId, paymentMethod,status } = dto
        const payment = await this.prisma.payment.create({
            data: {
                paymentMethod,
                partyId,
                participantId: userId,
                status: status,
                amount
            }
        })
        // const payment = await this.strip.paymentIntents.create({
        //     amount:amount,
        //     currency:'brl',
        //     automatic_payment_methods:{
        //         enabled:true
        //     },
        //     description:`Pagamento gerado por ${payment.participantId}`

        // })

        // return {clientSecret: paymentIntent.clientSecret}
    }

    async getAllByParty(partyId: number) {
        return await this.prisma.payment.findMany({
            where: { partyId, status: 'COMPLETED' },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                party: {
                    include: {
                        payments: {
                            select: {
                                status: true,
                                createdAt: true,

                            }
                        }
                    }
                }
            }
        })
    }
    async getAllByUser(userId: number) {
        return await this.prisma.payment.findMany({
            where: { participantId: userId, status: 'COMPLETED' },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                party: {
                    include: {
                        payments: {
                            select: {
                                party: {
                                    select: {
                                        name: true,
                                    }
                                },
                                status: true,
                                createdAt: true,

                            }
                        }
                    }
                }
            }
        })
    }


}
