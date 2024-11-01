import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';

enum PartyStatus {
    Enabled = 'Enabled',
    Disabled = 'Disabled'
}

export class CreatePartyDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'Descrição opcional da festa' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Meta de arrecadação para a festa' })
    @IsNumber()
    goal?: number;

    @ApiProperty({ description: 'Valor sugerido por participante' })
    @IsNumber()
    @IsOptional()
    valueForEachParticipant?: number;

   
}

export class UpdatePartyDto extends PartialType(CreatePartyDto) {
    @ApiProperty({ description: 'Status da festa', enum: PartyStatus })
    @IsEnum(PartyStatus)
    @IsOptional()
    status?: PartyStatus;

    @ApiProperty({ description: 'Chave PIX do criador da festa para pagamentos' })
    @IsString()
    @IsOptional()
    pixKey?: string;

    @ApiProperty({ description: 'Token para processamento de pagamentos via cartão' })
    @IsString()
    @IsOptional()
    cardToken?: string;

}
