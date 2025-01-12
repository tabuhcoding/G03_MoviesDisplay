import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepository } from './movies.repository';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ScrapMoviesTrendingWeekSchema, ScrapMoviesTrendingDaySchema, ScrapMovieGenresSchema, MoviesSchema,
  ScrapMoviesUpcomingSchema, ScrapMoviesNowPlayingSchema, ScrapMoviesPopularSchema, ScrapMoviesTopRatedSchema,
  LastestTrailersIntheatersSchema, LastestTrailersPopularSchema
} from './schema/empty.schema';
import { WatchlistSchema } from '../user/action/schema/watchlist.schema';
import { FavoriteListSchema } from '../user/action/schema/favorite-list.schema';

@Module({
  imports: [ConfigModule,
    MongooseModule.forFeature(
      [
      { name: 'scrap_movies_trending_day', schema: ScrapMoviesTrendingDaySchema },
      { name: 'scrap_movies_trending_week', schema: ScrapMoviesTrendingWeekSchema },
      { name: 'scrap_movie_genres', schema: ScrapMovieGenresSchema },
      { name: 'scrap_movies_upcoming', schema: ScrapMoviesUpcomingSchema },
      { name: 'scrap_movies_now_playing', schema: ScrapMoviesNowPlayingSchema },
      { name: 'scrap_movies_popular', schema: ScrapMoviesPopularSchema },
      { name: 'scrap_movies_top_rated', schema: ScrapMoviesTopRatedSchema },
      { name: 'lastest_trailers_intheaters', schema: LastestTrailersIntheatersSchema },
      { name: 'lastest_trailers_populars', schema: LastestTrailersPopularSchema },
      ],
      'otherNoSQL',
    ),
    MongooseModule.forFeature(
      [{ name: 'movies', schema: MoviesSchema }],
      'moviesNoSQL',
    ),
    MongooseModule.forFeature(
      [
        { name: 'Watchlist', schema: WatchlistSchema },
        { name: 'FavoriteList', schema: FavoriteListSchema },
      ],
      'auth',
    ),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
