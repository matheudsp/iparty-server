import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export enum PaymentMethod {
    PIX = "PIX",
    CARD = "CARD"
}

export enum PaymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}

export class PaymentDto {

    @ApiProperty({ description: 'ID da festa' })
    @IsNumber()
    partyId: number;

    @ApiProperty({ description: 'Valor do pagamento' })
    @IsNumber()
    amount: number;

    @ApiProperty({})
    @IsEnum(PaymentStatus)
    status: PaymentStatus

    @ApiProperty({ description: 'Método de pagamento', enum: PaymentMethod })
    @IsEnum(PaymentMethod) 
    paymentMethod: PaymentMethod;
}

