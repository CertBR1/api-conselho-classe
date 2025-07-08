import { Test, TestingModule } from '@nestjs/testing';
import { ConselhoClasseService } from './conselho-classe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConselhoClasse } from './entities/conselho-classe.entity';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { HttpException } from '@nestjs/common';

describe('ConselhoClasseService', () => {
  let service: ConselhoClasseService;
  let repository: jest.Mocked<Repository<ConselhoClasse>>;
  let queryRunner: jest.Mocked<QueryRunner>;
  let dataSource: jest.Mocked<DataSource>;

  beforeEach(async () => {
    const repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<Repository<ConselhoClasse>>;

    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        save: jest.fn(), // Will be overwritten below
      },
    } as unknown as jest.Mocked<QueryRunner>;

    // Explicitly mock manager.save as a Jest mock function
    (queryRunner.manager.save as jest.Mock).mockResolvedValue(undefined);

    dataSource = {
      createQueryRunner: jest.fn(() => queryRunner),
    } as unknown as jest.Mocked<DataSource>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConselhoClasseService,
        {
          provide: getRepositoryToken(ConselhoClasse),
          useValue: repositoryMock,
        },
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    service = module.get<ConselhoClasseService>(ConselhoClasseService);
    repository = module.get(getRepositoryToken(ConselhoClasse));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um conselho de classe', async () => {
      const dto = { data: new Date(), idCordenador: 1 } as any;
      const entidadeCriada = { ...dto, id: '1' };

      repository.create.mockReturnValue(entidadeCriada);
      (queryRunner.manager.save as jest.Mock).mockResolvedValue(entidadeCriada);

      const result = await service.create(dto);

      expect(queryRunner.connect).toHaveBeenCalled();
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.save).toHaveBeenCalledWith(entidadeCriada);
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
      expect(result).toEqual(entidadeCriada);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os conselhos', async () => {
      const mockData = [
        { id: '1', data: new Date(), idCordenador: 1, relatorios: [] },
        { id: '2', data: new Date(), idCordenador: 2, relatorios: [] }
      ] as unknown as ConselhoClasse[];
      repository.find.mockResolvedValue(mockData);

      const result = await service.findAll();

      expect(result).toEqual(mockData);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar um conselho pelo id', async () => {
      const mockItem = { id: 'abc', data: new Date(), idCordenador: 1, relatorios: [] };
      repository.findOne.mockResolvedValue(mockItem as any);

      const result = await service.findOne('abc');

      expect(result).toEqual(mockItem);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'abc' } });
    });
  });

  describe('update', () => {
    it('deve atualizar um conselho com dados diferentes', async () => {
      const id = '1';
      const existente = { id, data: new Date('2024-01-01'), outroCampo: 'A' };
      const atualizacao = { data: new Date('2025-01-01'), outroCampo: 'B' };

      repository.findOne.mockResolvedValue({ ...existente } as any);
      repository.save.mockResolvedValue({ ...existente, ...atualizacao, idCordenador: 1, relatorios: [] });

      const resultado = await service.update(id, atualizacao as any);

      expect(repository.save).toHaveBeenCalled();
      expect(resultado).toEqual({ ...existente, ...atualizacao, idCordenador: 1, relatorios: [] });
    });

    it('não deve atualizar se os dados forem iguais', async () => {
      const id = '1';
      const existente = { id, data: new Date('2024-01-01'), outroCampo: 'A' };

      repository.findOne.mockResolvedValue({ ...existente } as any);

      const resultado = await service.update(id, {
        data: new Date('2024-01-01'),
        outroCampo: 'A',
      } as any);

      expect(repository.save).not.toHaveBeenCalled();
      expect(resultado).toEqual(existente);
    });

    it('deve lançar erro se não encontrar o conselho', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.update('naoexiste', {})).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('deve remover um conselho existente', async () => {
      const mockConselho = { id: '123' };
      repository.findOne.mockResolvedValue(mockConselho as any);
      repository.remove.mockResolvedValue(mockConselho as any);

      const result = await service.remove('123');

      expect(result).toEqual(mockConselho);
      expect(repository.remove).toHaveBeenCalledWith(mockConselho);
    });

    it('deve lançar erro se o conselho não existir', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove('naoexiste')).rejects.toThrow(HttpException);
    });
  });
});
