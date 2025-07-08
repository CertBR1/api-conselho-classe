import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConselhoClasseService } from './conselho-classe.service';
import { CreateConselhoClasseDto } from './dto/create-conselho-classe.dto';
import { UpdateConselhoClasseDto } from './dto/update-conselho-classe.dto';

@Controller('conselho-classe')
export class ConselhoClasseController {
  constructor(private readonly conselhoClasseService: ConselhoClasseService) { }

  @Post()
  create(@Body() createConselhoClasseDto: CreateConselhoClasseDto) {
    return this.conselhoClasseService.create(createConselhoClasseDto);
  }

  @Get()
  findAll() {
    return this.conselhoClasseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conselhoClasseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConselhoClasseDto: UpdateConselhoClasseDto) {
    return this.conselhoClasseService.update(id, updateConselhoClasseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conselhoClasseService.remove(id);
  }
}
