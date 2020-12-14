import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryService } from './dictionary.service';

describe('DictionaryService', () => {
  let service: DictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictionaryService],
    }).compile();

    service = module.get<DictionaryService>(DictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('set and get', () => {
    service.set("test", "Hello");
    let result = service.get("test")
    expect(result).toBeDefined();
    expect(result).toEqual("Hello")
  })

  it('overwrite', () => {
    service.set("test", "Hello");
    service.set("test", "Hello World");
    let result = service.get("test")
    expect(result).toBeDefined();
    expect(result).toEqual("Hello World")
  })

  it('one + one equal2', () => {
    expect(1 + 2).toEqual(3)      
  })

});
