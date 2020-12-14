import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { ResponseSuccess, ResponseError } from 'src/common/dto/response.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { FactsService } from './facts.service';

@Controller('facts')
@ApiTags('Facts')
export class FactsController {

  constructor(
    private readonly factsService: FactsService
  ) { }

  @Get("/")
  get(): IResponse {
    try {
      let fact = this.factsService.random();
      return new ResponseSuccess("COMMON.SUCCESS", fact);
    }
    catch (e) {
      return new ResponseError("COMMON.SUCCESS", e.message)
    }
  }

}
