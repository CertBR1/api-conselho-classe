import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConselhoClasseService } from './conselho-classe.service';
import { CreateConselhoClasseDto } from './dto/create-conselho-classe.dto';
import { UpdateConselhoClasseDto } from './dto/update-conselho-classe.dto';
import { CreateRelatorioConselhoClasseDto } from './dto/create-relatorio-conselhor-classe.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('conselho-classe')
export class ConselhoClasseController {
  constructor(private readonly conselhoClasseService: ConselhoClasseService) { }

  @ApiOperation({ summary: 'Buscar relatório de um aluno no conselho de classe' })
  @ApiParam({ name: 'id', description: 'ID do Conselho de Classe' })
  @ApiParam({ name: 'idAluno', description: 'ID do Aluno' })
  @ApiResponse({ status: 200, description: 'Relatório encontrado com sucesso' })
  @Get(':id/aluno:idAluno/relatorio')
  findRelatorio(@Param('id') id: string, @Param('idAluno') idAluno: string) {
    return this.conselhoClasseService.findRelatorioByAluno(id, idAluno);
  }


  @ApiOperation({ summary: 'Criar relatório para um aluno no conselho de classe' })
  @ApiParam({ name: 'id', description: 'ID do Conselho de Classe' })
  @ApiParam({ name: 'idAluno', description: 'ID do Aluno' })
  @ApiBody({ type: CreateRelatorioConselhoClasseDto })
  @ApiResponse({ status: 201, description: 'Relatório criado com sucesso' })
  @Post(':id/aluno:idAluno/relatorio')
  createRelatorio(@Param('id') id: string, @Param('idAluno') idAluno: string, @Body() createRelatorioConselhoClasseDto: CreateRelatorioConselhoClasseDto) {
    return this.conselhoClasseService.createRelatorio(id, idAluno, createRelatorioConselhoClasseDto);
  }

  @ApiOperation({ summary: 'Criar um novo conselho de classe' })
  @ApiBody({ type: CreateConselhoClasseDto })
  @ApiResponse({ status: 201, description: 'Conselho de Classe criado com sucesso' })
  @Post()
  create(@Body() createConselhoClasseDto: CreateConselhoClasseDto) {
    return this.conselhoClasseService.create(createConselhoClasseDto);
  }

  @ApiOperation({ summary: 'Listar todos os conselhos de classe' })
  @ApiResponse({ status: 200, description: 'Lista de Conselhos de Classe' })
  @Get()
  findAll() {
    return this.conselhoClasseService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um conselho de classe por ID' })
  @ApiParam({ name: 'id', description: 'ID do Conselho de Classe' })
  @ApiResponse({ status: 200, description: 'Conselho de Classe encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conselhoClasseService.findOne(id);
  }


  @ApiOperation({ summary: 'Atualizar um conselho de classe' })
  @ApiParam({ name: 'id', description: 'ID do Conselho de Classe' })
  @ApiBody({ type: UpdateConselhoClasseDto })
  @ApiResponse({ status: 200, description: 'Conselho de Classe atualizado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConselhoClasseDto: UpdateConselhoClasseDto) {
    return this.conselhoClasseService.update(id, updateConselhoClasseDto);
  }


  @ApiOperation({ summary: 'Remover um conselho de classe' })
  @ApiParam({ name: 'id', description: 'ID do Conselho de Classe' })
  @ApiResponse({ status: 200, description: 'Conselho de Classe removido' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conselhoClasseService.remove(id);
  }
}
