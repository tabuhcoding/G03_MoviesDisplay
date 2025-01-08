import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
