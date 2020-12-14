import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DictionaryModule } from './dictionary/dictionary.module';
import { FactsModule } from './facts/facts.module';

@Module({
  imports: [DictionaryModule, FactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
