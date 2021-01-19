import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { FactsModule } from './facts/facts.module';

@Module({
  imports: [
    AuthModule, FactsModule, DictionaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
