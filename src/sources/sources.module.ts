import { Module } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { SourcesResolver } from './sources.resolver';

@Module({
  providers: [SourcesResolver, SourcesService]
})
export class SourcesModule {}
