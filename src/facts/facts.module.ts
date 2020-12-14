import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common/cache/cache.module';
import { FactsController } from './facts.controller';
import { FactsService } from './facts.service';

@Module({
  imports: [CacheModule.register({
    ttl: 60
  })],
  controllers: [FactsController],
  providers: [FactsService],
})
export class FactsModule {}
