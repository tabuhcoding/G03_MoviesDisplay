import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_movies_trending_week', strict: false })
export class ScrapMoviesTrendingWeek extends Document {}
@Schema({ collection: 'scrap_movies_trending_day', strict: false })
export class ScrapMoviesTrendingDay extends Document {}
@Schema({ collection: 'scrap_movie_genres', strict: false })
export class ScrapMovieGenres extends Document {}
@Schema({ collection: 'movies', strict: false })
export class Movies extends Document {}
@Schema({ collection: 'scrap_movies_upcoming', strict: false })
export class ScrapMoviesUpcoming extends Document {}
@Schema({ collection: 'scrap_movies_now_playing', strict: false })
export class ScrapMoviesNowPlaying extends Document {}
@Schema({ collection: 'scrap_movies_popular', strict: false })
export class ScrapMoviesPopular extends Document {}
@Schema({ collection: 'scrap_movies_top_rated', strict: false })
export class ScrapMoviesTopRated extends Document {}
@Schema({ collection: 'lastest_trailers_intheaters', strict: false })
export class LastestTrailersIntheaters extends Document {}
@Schema({ collection: 'lastest_trailers_populars', strict: false })
export class LastestTrailersPopular extends Document {}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
export const ScrapMovieGenresSchema = SchemaFactory.createForClass(ScrapMovieGenres);
export const ScrapMoviesTrendingWeekSchema = SchemaFactory.createForClass(ScrapMoviesTrendingWeek);
export const ScrapMoviesTrendingDaySchema = SchemaFactory.createForClass(ScrapMoviesTrendingDay);
export const ScrapMoviesUpcomingSchema = SchemaFactory.createForClass(ScrapMoviesUpcoming);
export const ScrapMoviesNowPlayingSchema = SchemaFactory.createForClass(ScrapMoviesNowPlaying);
export const ScrapMoviesPopularSchema = SchemaFactory.createForClass(ScrapMoviesPopular);
export const ScrapMoviesTopRatedSchema = SchemaFactory.createForClass(ScrapMoviesTopRated);
export const LastestTrailersIntheatersSchema = SchemaFactory.createForClass(LastestTrailersIntheaters);
export const LastestTrailersPopularSchema = SchemaFactory.createForClass(LastestTrailersPopular);