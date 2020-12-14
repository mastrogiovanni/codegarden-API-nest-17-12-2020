import { Test, TestingModule } from '@nestjs/testing';
import { FactsController } from './facts.controller';
import { FactsService } from './facts.service';

describe('FactsController', () => {
  let controller: FactsController;
  let service: FactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactsService],
      controllers: [FactsController],
    }).compile();

    controller = module.get<FactsController>(FactsController);
    service = module.get<FactsService>(FactsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns a particular fact', () => {
    jest.spyOn(service, 'random').mockImplementation(() => "Norris sucks");
    let response = controller.get();
    expect(response).toBeDefined();
    expect(response).toEqual({
      success: true,
      data: "Norris sucks",
      message: "COMMON.SUCCESS"
    })
  });
});
