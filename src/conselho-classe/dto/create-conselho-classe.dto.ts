import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConselhoClasseDto {

    @ApiProperty({
        description: 'Data em que o conselho de classe será realizado',
        example: '2025-07-08',
    })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'Data do conselho é inválida' })
    data: Date;

    @ApiProperty({
        description: 'ID do coordenador responsável pelo conselho (vem de outro sistema)',
        example: 101,
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber({}, { message: 'O ID do coordenador deve ser um número' })
    idCordenador: number;
}
