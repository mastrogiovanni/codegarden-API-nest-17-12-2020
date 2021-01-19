import { CacheModule, Module } from '@nestjs/common';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';

import * as redisStore from 'cache-manager-redis-store';

import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      // secret: 'incredible',
      host: process.env.REDIS_HOST,
      port: 6379,
    })
  ],
  controllers: [DictionaryController],
  providers: [DictionaryService]
})
export class DictionaryModule {}
