import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

enum PaymentMethod {
    PIX,
    CARD
}

export class PaymentDto {

    @ApiProperty({ description: 'ID da festa' })
    @IsNumber()
    partyId: number;

    @ApiProperty({ description: 'Valor do pagamento' })
    @IsNumber()
    amount: number;

    @ApiProperty({ description: 'Método de pagamento', enum: PaymentMethod })
    @IsEnum(PaymentMethod) // Use o enum do Prisma
    paymentMethod: PaymentMethod;
}

