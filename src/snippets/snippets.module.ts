import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { Snippet } from './entities/snippet.entity';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Snippet]),
    TagsModule,
  ],
  controllers: [SnippetsController],
  providers: [SnippetsService],
})
export class SnippetsModule {}