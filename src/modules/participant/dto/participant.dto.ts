import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ParticipantDto {
    
    @ApiProperty({ description: '' })
    @IsNumber()
    partyId: number;

    @ApiProperty({ description: '' })
    @IsNumber()
    userId: number;

    
}


export class addParticipantDto {
    
    @ApiProperty()
    @IsNumber()
    partyId: number;


    
}