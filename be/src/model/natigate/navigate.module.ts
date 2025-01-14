import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrapMovieGenresSchema, MoviesSchema } from '@/model/movies/schema/empty.schema';
import { NavigateService } from './navigate.service';
import { NavigateController } from './navigate.controller';
import { NavigateRepository } from './navigate.repository';
@Module({
  imports: [ConfigModule,
      MongooseModule.forFeature(
        [
          { name: 'scrap_movie_genres', schema: ScrapMovieGenresSchema },
        ], 'otherNoSQL'
      ),
      MongooseModule.forFeature(
            [{ name: 'movies', schema: MoviesSchema }],
            'moviesNoSQL',
          ),
    ],
      
  controllers: [NavigateController],
  providers: [NavigateRepository, NavigateService],
})
export class NavigateModule {}
