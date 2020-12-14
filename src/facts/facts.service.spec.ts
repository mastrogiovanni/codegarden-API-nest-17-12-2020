import { Test, TestingModule } from '@nestjs/testing';
import { FactsService } from './facts.service';
import * as fs from 'fs';

describe('FactsService', () => {
  let service: FactsService;
  let facts: [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactsService],
    }).compile();

    service = module.get<FactsService>(FactsService);
    facts = JSON.parse(fs.readFileSync(__dirname + "/templates/facts.json").toString("UTF-8"))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns a random fact', () => {
    let fact = service.random();
    expect(fact).toBeDefined();

    // jest.spyOn(service, 'random').mockImplementation(() => "Test");
    for (let i = 0; i < facts.length * 10; i ++ ) {
      expect(facts).toContain(fact)
    }
  });

});
