import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';

describe('DictionaryController', () => {
  let controller: DictionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictionaryController],
      imports: [CacheModule.register()],
      providers: [DictionaryService]
    }).compile();

    controller = module.get<DictionaryController>(DictionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
