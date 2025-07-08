import { HttpException, Injectable } from '@nestjs/common';
import { CreateConselhoClasseDto } from './dto/create-conselho-classe.dto';
import { UpdateConselhoClasseDto } from './dto/update-conselho-classe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConselhoClasse } from './entities/conselho-classe.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ConselhoClasseService {
  constructor(
    @InjectRepository(ConselhoClasse)
    private readonly conselhoClasseRepository: Repository<ConselhoClasse>,
    private readonly dataSource: DataSource
  ) { }
  async create(createConselhoClasseDto: CreateConselhoClasseDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const conselhoClasse = this.conselhoClasseRepository.create(createConselhoClasseDto);
      await queryRunner.manager.save(conselhoClasse);
      await queryRunner.commitTransaction();
      return conselhoClasse;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 500);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      return await this.conselhoClasseRepository.find();
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.conselhoClasseRepository.findOne({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, dadosAtualizados: UpdateConselhoClasseDto) {
    try {
      const conselhoClasse = await this.conselhoClasseRepository.findOne({ where: { id } });
      if (!conselhoClasse) {
        throw new HttpException('Conselho de Classe não encontrado', 404);
      }
      let houveAlteracao = false;
      for (const campo of Object.keys(dadosAtualizados)) {
        const valorNovo = dadosAtualizados[campo];
        const valorAntigo = conselhoClasse[campo];
        const ehData = valorNovo instanceof Date && valorAntigo instanceof Date;
        const saoIguais =
          ehData ? valorNovo.getTime() === valorAntigo.getTime() : valorNovo === valorAntigo;
        if (valorNovo !== undefined && !saoIguais) {
          conselhoClasse[campo] = valorNovo;
          houveAlteracao = true;
        }
      }
      if (!houveAlteracao) {
        return conselhoClasse;
      }
      return await this.conselhoClasseRepository.save(conselhoClasse);
    } catch (erro) {
      console.error(erro);
      throw new HttpException(erro.message, 500);
    }
  }


  async remove(id: string) {
    try {
      const conselhoClasse = await this.conselhoClasseRepository.findOne({ where: { id } });
      if (!conselhoClasse) {
        throw new HttpException('Conselho de Classe nao encontrado', 404);
      }
      return await this.conselhoClasseRepository.remove(conselhoClasse);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 500);
    }
  }
}
