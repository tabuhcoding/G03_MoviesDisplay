import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ScrapMoviesTrendingWeekSchema, ScrapMoviesTrendingDaySchema, ScrapMovieGenresSchema, MoviesSchema } from './schema/empty.schema';

@Module({
  imports: [ConfigModule,
    MongooseModule.forFeature(
      [
      { name: 'scrap_movies_trending_day', schema: ScrapMoviesTrendingDaySchema },
      { name: 'scrap_movies_trending_week', schema: ScrapMoviesTrendingWeekSchema },
      { name: 'scrap_movie_genres', schema: ScrapMovieGenresSchema },
      ],
      'otherNoSQL',
    ),
    MongooseModule.forFeature(
      [{ name: 'movies', schema: MoviesSchema }],
      'moviesNoSQL',
    ),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
