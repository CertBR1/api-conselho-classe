import { Module } from '@nestjs/common';
import { ConselhoClasseService } from './conselho-classe.service';
import { ConselhoClasseController } from './conselho-classe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConselhoClasse } from './entities/conselho-classe.entity';
import { RelatorioConselhoClasse } from './entities/relatorio-conselho-classe.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConselhoClasse, RelatorioConselhoClasse]),
  ],
  controllers: [ConselhoClasseController],
  providers: [ConselhoClasseService],
})
export class ConselhoClasseModule { }
