import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { Get, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { CacheInterceptor } from '@nestjs/common/cache/interceptors/cache.interceptor';
import { Key } from './dto/key.dto';
import { KeyValue } from './dto/keyvalue.dto';
import { DictionaryService } from './dictionary.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager'

@Controller('dictionary')
@ApiTags('Dictionary')
export class DictionaryController {

    constructor(
      private readonly dictionaryService: DictionaryService,
      @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}
    
    @Get("/")
    get(@Query() query: Key) : IResponse {
      try {
        let result = this.dictionaryService.get(query.key)
        if (result) {
          return new ResponseSuccess("COMMON.SUCCESS", result);
        }
        else {
          return new ResponseError("DICTIONARY.NOT_FOUND")
        }
      }
      catch (e) {
        return new ResponseError("COMMON.ERROR", e.message)
      }
    }  
  
    @Put()
    set(@Query() query: KeyValue): IResponse {
      try {
        this.dictionaryService.set(query.key, query.value)
        return new ResponseSuccess("COMMON.SUCCESS");
      }
      catch (e) {
        return new ResponseError("COMMON.ERROR", e.message)
      }
      return ;
    }  
  
    @Get("/slow")
    @UseInterceptors(CacheInterceptor)
    async getSlow(@Query() query: Key) : Promise<IResponse> {
      try {
        let result = this.dictionaryService.getSlow(query.key)
        if (result) {
          return new ResponseSuccess("COMMON.SUCCESS", result);
        }
        else {
          return new ResponseError("DICTIONARY.NOT_FOUND", query.key)
        }
      }
      catch (e) {
        return new ResponseError("COMMON.ERROR", e.message)
      }
    }
  
}
