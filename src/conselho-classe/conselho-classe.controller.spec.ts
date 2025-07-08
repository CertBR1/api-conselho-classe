import { Test, TestingModule } from '@nestjs/testing';
import { ConselhoClasseController } from './conselho-classe.controller';
import { ConselhoClasseService } from './conselho-classe.service';
import { CreateConselhoClasseDto } from './dto/create-conselho-classe.dto';
import { UpdateConselhoClasseDto } from './dto/update-conselho-classe.dto';

describe('ConselhoClasseController', () => {
  let controller: ConselhoClasseController;
  let service: jest.Mocked<ConselhoClasseService>;

  beforeEach(async () => {
    const serviceMock: jest.Mocked<ConselhoClasseService> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConselhoClasseController],
      providers: [
        {
          provide: ConselhoClasseService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<ConselhoClasseController>(ConselhoClasseController);
    service = module.get(ConselhoClasseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve chamar o service.create com o dto correto', async () => {
      const dto: CreateConselhoClasseDto = { data: new Date(), idCordenador: 1 };
      const result = { id: 'abc', ...dto, relatorios: [] };

      service.create.mockResolvedValue(result);

      const resposta = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(resposta).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('deve chamar o service.findAll', async () => {
      const resultadoEsperado = [
        { id: '1', data: new Date(), idCordenador: 1, relatorios: [] },
        { id: '2', data: new Date(), idCordenador: 2, relatorios: [] },
      ];
      service.findAll.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('findOne', () => {
    it('deve chamar o service.findOne com o id correto', async () => {
      const id = '123';
      const resultadoEsperado = { id, data: new Date(), idCordenador: 1, relatorios: [] };
      service.findOne.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('update', () => {
    it('deve chamar o service.update com o id e o dto', async () => {
      const id = 'abc';
      const dto: UpdateConselhoClasseDto = { data: new Date(), idCordenador: 2 };
      const resultadoEsperado = { id, data: dto.data, idCordenador: dto.idCordenador, relatorios: [] };

      service.update.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.update(id, dto);

      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('remove', () => {
    it('deve chamar o service.remove com o id', async () => {
      const id = '456';
      const resultadoEsperado = { success: true };

      service.remove.mockResolvedValue(resultadoEsperado as any);

      const resultado = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });
});
