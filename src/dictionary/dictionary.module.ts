import { CacheModule, Module } from '@nestjs/common';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [DictionaryController],
  providers: [DictionaryService]
})
export class DictionaryModule {}
