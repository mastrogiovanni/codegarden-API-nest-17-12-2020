import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common/cache/cache.module';
import { FactsController } from './facts.controller';
import { FactsService } from './facts.service';

@Module({
  controllers: [FactsController],
  providers: [FactsService],
})
export class FactsModule {}
