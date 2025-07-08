import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateRelatorioConselhoClasseDto {
    @ApiProperty({
        description: 'ID do aluno (vem de outro sistema)',
        example: 123,
    })
    @IsNumber({}, { message: 'O campo idAluno deve ser um número' })
    idAluno: number;

    @ApiProperty({
        description: 'ID da disciplina (vem de outro sistema)',
        example: 45,
    })
    @IsNumber({}, { message: 'O campo idDisciplina deve ser um número' })
    idDisciplina: number;

    @ApiProperty({
        description: 'Indica se o aluno conversa demais',
        example: false,
    })
    @IsBoolean({ message: 'O campo conversaDeMais deve ser verdadeiro ou falso' })
    conversaDeMais: boolean;

    @ApiProperty({
        description: 'Indica se o aluno não presta atenção',
        example: false,
    })
    @IsBoolean({ message: 'O campo naoPrestaAtencao deve ser verdadeiro ou falso' })
    naoPrestaAtencao: boolean;

    @ApiProperty({
        description: 'Indica se o aluno não faz as tarefas',
        example: false,
    })
    @IsBoolean({ message: 'O campo naoFazTarefas deve ser verdadeiro ou falso' })
    naoFazTarefas: boolean;

    @ApiProperty({
        description: 'Indica se o aluno não faz as tarefas de casa',
        example: false,
    })
    @IsBoolean({ message: 'O campo naoFazParaCasa deve ser verdadeiro ou falso' })
    naoFazParaCasa: boolean;

    @ApiProperty({
        description: 'Observações adicionais',
        example: 'Fica distraído com o celular',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'O campo outros deve ser uma string' })
    outros?: string;
}
